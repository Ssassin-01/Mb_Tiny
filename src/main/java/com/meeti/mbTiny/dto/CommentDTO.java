package com.meeti.mbTiny.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {
    private Long id;
    private String mbti;
    private String email;
    private String nickname;
    private String content;
    private String createdAt;
}
