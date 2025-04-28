package com.meeti.mbTiny.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDTO {
    private String roomId;
    private String sender;
    private String content;
}
