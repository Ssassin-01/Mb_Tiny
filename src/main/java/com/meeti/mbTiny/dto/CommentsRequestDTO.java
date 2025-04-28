package com.meeti.mbTiny.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentsRequestDTO {
    @NotBlank(message = "내용 입력은 필수입니다.")
    private String content;
}
