package com.meeti.mbTiny.dto;

import com.meeti.mbTiny.entity.Member;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private String nickname;
    private boolean isAnonymous;
    private String tags;
    private String createdAt;
}