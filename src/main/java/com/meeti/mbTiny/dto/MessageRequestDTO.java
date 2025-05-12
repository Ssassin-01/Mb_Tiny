package com.meeti.mbTiny.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageRequestDTO {
    private Long roomId;
    private Long senderId;
    private String content;
}
