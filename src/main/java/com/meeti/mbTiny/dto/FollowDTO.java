package com.meeti.mbTiny.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FollowDTO {
    private Long id;
    private String nickname;
    private String email;
    private String mbti;
    private String profileImgUrl;
}
