package com.meeti.mbTiny.service;

import com.meeti.mbTiny.dto.MessageDTO;
import com.meeti.mbTiny.dto.MessageRequestDTO;
import com.meeti.mbTiny.entity.ChatRoom;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Message;
import com.meeti.mbTiny.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final ChatRoomService chatRoomService;
    private final MemberService memberService;

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

    private MessageDTO converToDTO(Message message) {
        return MessageDTO.builder()
                .id(message.getId())
                .senderNickname(message.getSender().getNickname())
                .content(message.getContent())
                .sentAt(message.getSentAt())
                .build();
    }
}
