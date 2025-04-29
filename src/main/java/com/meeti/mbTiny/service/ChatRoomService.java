package com.meeti.mbTiny.service;

import com.meeti.mbTiny.dto.ChatRoomDTO;
import com.meeti.mbTiny.entity.ChatRoom;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Message;
import com.meeti.mbTiny.repository.ChatRoomRepository;
import com.meeti.mbTiny.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;

    public List<ChatRoomDTO> getChatRoomsForMember(Member member) {
        List<ChatRoom> chatRooms = chatRoomRepository.findBySenderOrReceiver(member, member);
        List<ChatRoomDTO> result = new ArrayList<>();

        for (ChatRoom room : chatRooms) {
            Message lastMessage = messageRepository.findTopByChatRoomOrderBySentAtDesc(room);
            if (lastMessage == null) continue;

            Member receiver = (room.getSender().getId().equals(member.getId()))
                    ? room.getReceiver()
                    : room.getSender();

            ChatRoomDTO dto = convertToDTO(room, receiver, lastMessage);
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
}
