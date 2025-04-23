package com.meeti.mbTiny.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RegisterDto {
    private String email;
    private String password;
    private String gender;
    private LocalDate birthday;
    private String phone;
    private String nickname;
    private String mbti;
}
