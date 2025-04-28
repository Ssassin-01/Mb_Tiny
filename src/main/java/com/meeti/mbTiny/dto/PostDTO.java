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
    private boolean isAnonymous = false;
    private Long viewCount;
    private String imageUrl;
    private String email;
    private String nickname;
    private String createdAt;
    private String mbti;
    private Long likeCount;
    private boolean liked;
}