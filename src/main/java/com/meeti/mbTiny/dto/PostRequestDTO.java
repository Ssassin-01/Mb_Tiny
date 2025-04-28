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
public class PostRequestDTO {
    private String title;
    @NotBlank(message = "내용은 필수입니다")
    private String content;
    private String imageUrl;;

}