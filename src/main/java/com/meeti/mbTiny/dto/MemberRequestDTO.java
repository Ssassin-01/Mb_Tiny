package com.meeti.mbTiny.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MemberRequestDTO {
    @NotBlank(message = "메세지 입력하세요")
    private String email;
    @NotBlank(message = "패스워드 입력하세요")
    private String password;
    @NotBlank(message = "성별을 선택해주세요")
    private String gender;
    @NotBlank(message = "휴대전화를 입력해주세요")
    private String phone;
    @NotNull(message = "생일을 입력해주세요")
    private LocalDate birthday;
    @NotBlank(message = "닉네임 입력하세요")
    private String nickname;
    private String mbti;
    private String address;
    private String profileImgUrl;

}