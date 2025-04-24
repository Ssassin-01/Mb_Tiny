package com.meeti.mbTiny.dto.user;

import com.meeti.mbTiny.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class DetailDto {
    private String email;
    private String gender;
    private LocalDate birthday;
    private String phone;
    private String nickname;
    private String mbti;
    private String profileImgUrl;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public DetailDto(User user) {
        this.email = user.getEmail();
        this.gender = user.getGender();
        this.birthday = user.getBirthday();
        this.phone = user.getPhone();
        this.nickname = user.getNickname();
        this.mbti = user.getMbti();
        this.profileImgUrl = user.getProfileImgUrl();
        this.createDate = user.getCreateDate();
        this.updateDate = user.getUpdateDate();
    }
}