package com.meeti.mbTiny.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ChatRoomDTO {
    private Long roomId;
    private String receiverNickname;
    private String lastMessage;
    private LocalDateTime lastSentAt;
}
