package com.meeti.mbTiny.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberRequestDTO {
    @NotBlank(message = "메세지 입력하세요")
    private String email;
    @NotBlank(message = "패스워드 입력하세요")
    private String password;
    @NotBlank(message = "유저이름 입력하세요")
    private String username;
    @NotBlank(message = "닉네임 입력하세요")
    private String nickname;
    @NotBlank(message = "성별을 선택해주세요")
    private String gender;
}
