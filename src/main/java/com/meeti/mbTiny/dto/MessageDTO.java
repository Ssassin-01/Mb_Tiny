package com.meeti.mbTiny.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {

    private Long id;
    private Long roomId;
    private String senderNickname;
    private String content;
    private LocalDateTime sentAt;
}
