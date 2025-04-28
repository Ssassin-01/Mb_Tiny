package com.meeti.mbTiny.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class MemberUpdateRequestDTO {
    private String password;
    private String gender;
    private String phone;
    private LocalDate birthday;
    private String mbti;
    private MultipartFile profileImg;
}
