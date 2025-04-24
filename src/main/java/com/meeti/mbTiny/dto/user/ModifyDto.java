package com.meeti.mbTiny.dto.user;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ModifyDto {
    private String password;
    private String gender;
    private String phone;
    private LocalDate birthday;
    private String mbti;
    private String profileImgUrl;
}
