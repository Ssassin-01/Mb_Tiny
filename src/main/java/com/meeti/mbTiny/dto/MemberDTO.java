package com.meeti.mbTiny.dto;

import com.meeti.mbTiny.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDTO {
    private String email;
    private String gender;
    private LocalDate birthday;
    private String phone;
    private String nickname;
    private String mbti;
    private String address;
    private String profileImgUrl;
    private int followerCount;
    private int followingCount;
    private String createdAt;
    private String updatedAt;
}