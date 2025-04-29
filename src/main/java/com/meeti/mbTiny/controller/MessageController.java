package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.MessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage") // 클라이언트가 /app/chat.sendMessage로 보내면 여기가 받는다
    @SendTo("/topic/public") // 받은 메시지를 다시 /topic/public으로 브로드캐스트
    public void sendMessage(@Payload MessageDTO message) {
        messagingTemplate.convertAndSend("/topic/room/" + message.getRoomId(), message);
    }
}
