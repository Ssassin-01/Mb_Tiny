package com.meeti.mbTiny.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class MessageDTO {

    private Long id;
    private String senderNickname;
    private String content;
    private LocalDateTime sentAt;
}
