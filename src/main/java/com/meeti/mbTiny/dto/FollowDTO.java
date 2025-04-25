package com.meeti.mbTiny.dto;

import com.meeti.mbTiny.entity.Member;
import lombok.*;

@Data
@AllArgsConstructor
public class FollowDTO {
    private Long id;
    private String nickname;
    private String mbti;
    private String profileImgUrl;

    public FollowDTO(Member member) {
        this.id = member.getId();
        this.nickname = member.getNickname();
        this.mbti = member.getMbti();
        this.profileImgUrl = member.getProfileImgUrl();
    }
}
