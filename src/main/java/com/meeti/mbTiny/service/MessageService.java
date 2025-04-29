package com.meeti.mbTiny.service;

import com.meeti.mbTiny.dto.MessageDTO;
import com.meeti.mbTiny.dto.MessageRequestDTO;
import com.meeti.mbTiny.entity.ChatRoom;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Message;
import com.meeti.mbTiny.repository.ChatRoomRepository;
import com.meeti.mbTiny.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomService chatRoomService;
    private final MemberService memberService;

    @Transactional(readOnly = true)
    public List<MessageDTO> getMessagesForChatRoom(Long roomId, Member loginUser) {
        ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("채팅방을 찾을 수 없습니다."));

        if (!chatRoom.getSender().getId().equals(loginUser.getId()) &&
                !chatRoom.getReceiver().getId().equals(loginUser.getId())) {
            throw new AccessDeniedException("이 채팅방에 접근할 수 없습니다.");
        }

        List<Message> messages = messageRepository.findByChatRoomOrderBySentAtAsc(chatRoom);

        return messages.stream()
                .map(this::convertToDTO)
                .toList();
    }


//    public MessageDTO saveMessage(MessageRequestDTO dto) {
//        ChatRoom chatRoom = chatRoomService.findById(dto.getRoomId());
//        Member sender = memberService.findById(dto.getSenderId());
//
//        Message message = Message.builder()
//                .chatRoom(chatRoom)
//                .sender(sender)
//                .content(content)
//                .build();
//    }

    private MessageDTO convertToDTO(Message message) {
        return MessageDTO.builder()
                .id(message.getId())
                .senderNickname(message.getSender().getNickname())
                .content(message.getContent())
                .sentAt(message.getSentAt())
                .build();
    }
}
