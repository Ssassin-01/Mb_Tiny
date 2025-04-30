package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.MessageDTO;
import com.meeti.mbTiny.entity.Message;
import com.meeti.mbTiny.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload MessageDTO dto) {
        System.out.println("WebSocket 메시지 수신: "+ dto.getContent());
        messageService.saveMessage(dto);
        messagingTemplate.convertAndSend("/topic/room/" + dto.getRoomId(), dto);
    }
}
