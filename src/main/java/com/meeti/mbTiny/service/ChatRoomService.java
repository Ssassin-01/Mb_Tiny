package com.meeti.mbTiny.service;

import com.meeti.mbTiny.dto.ChatRoomDTO;
import com.meeti.mbTiny.entity.ChatRoom;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Message;
import com.meeti.mbTiny.repository.ChatRoomRepository;
import com.meeti.mbTiny.repository.MemberRepository;
import com.meeti.mbTiny.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;

    public ChatRoom getOrCreateChatRoom(String senderNickname, String receiverNickname) {
        Member sender = memberRepository.findByNickname(senderNickname)
                .orElseThrow(() -> new IllegalArgumentException("보내는 사람 없음"));

        Member receiver = memberRepository.findByNickname(receiverNickname)
                .orElseThrow(() -> new IllegalArgumentException("받는 사람 없음"));

        Optional<ChatRoom> existing = chatRoomRepository
                .findBySenderAndReceiverOrReceiverAndSender(sender, receiver, sender, receiver);

        return existing.orElseGet(() -> chatRoomRepository.save(
                ChatRoom.builder()
                        .sender(sender)
                        .receiver(receiver)
                        .build()
        ));
    }

    public List<ChatRoomDTO> getChatRoomsForMember(Member member) {
        List<ChatRoom> chatRooms = chatRoomRepository.findBySenderOrReceiver(member, member);
        List<ChatRoomDTO> result = new ArrayList<>();

        for (ChatRoom room : chatRooms) {
            Message lastMessage = messageRepository.findTopByChatRoomOrderBySentAtDesc(room);
            if (lastMessage == null) continue;

            Member target = (room.getSender().getId().equals(member.getId()))
                    ? room.getReceiver()
                    : room.getSender();

            ChatRoomDTO dto = convertToDTO(room, target, lastMessage);
            result.add(dto);
        }

        result.sort((a, b) -> b.getLastSentAt().compareTo(a.getLastSentAt()));

        return result;
    }

    private ChatRoomDTO convertToDTO(ChatRoom room, Member receiver, Message lastMessage) {
        return ChatRoomDTO.builder()
                .roomId(room.getId())
                .receiverNickname(receiver.getNickname())
                .lastMessage(lastMessage.getContent())
                .lastSentAt(lastMessage.getSentAt())
                .build();
    }

    public ChatRoomDTO toDTO(ChatRoom chatRoom, Member currentUser) {
        Member other = chatRoom.getSender().equals(currentUser)
                ? chatRoom.getReceiver()
                : chatRoom.getSender();

        // 마지막 메시지
        List<Message> messages = chatRoom.getMessages();
        messages.sort(Comparator.comparing(Message::getSentAt));
        Message lastMessage = messages.isEmpty() ? null : messages.get(messages.size() - 1);

        return ChatRoomDTO.builder()
                .roomId(chatRoom.getId())
                .receiverNickname(other.getNickname())
                .lastMessage(lastMessage != null ? lastMessage.getContent() : "")
                .lastSentAt(lastMessage != null ? lastMessage.getSentAt() : null)
                .build();
    }


}
