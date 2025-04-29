package com.meeti.mbTiny.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberListResponseDTO {
    private Long id;
    private String nickname;
    private String mbti;
    private int followerCount;
    private String profileImgUrl;
}
