package com.meeti.mbTiny.service;

import com.meeti.mbTiny.domain.User;
import com.meeti.mbTiny.dto.user.DetailDto;
import com.meeti.mbTiny.dto.user.ModifyDto;
import com.meeti.mbTiny.dto.user.RegisterDto;
import com.meeti.mbTiny.repository.UserRepository;
import com.meeti.mbTiny.security.CustomUserDetails;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder pEncoder;

    //회원 등록
    public User register(RegisterDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        if (userRepository.existsByNickname(dto.getNickname())) {
            throw new IllegalArgumentException("이미 사용중인 닉네임입니다.");
        }

        User user = new User();

        user.setEmail(dto.getEmail());
        user.setPassword(pEncoder.encode(dto.getPassword()));
        user.setGender(dto.getGender());
        user.setPhone(dto.getPhone());
        user.setBirthday(dto.getBirthday());
        user.setNickname(dto.getNickname());
        user.setMbti(dto.getMbti());

        return userRepository.save(user);
    }

    //회원정보 수정
    @Transactional
    public void updateUser(String email, ModifyDto dto) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        user.setPassword(pEncoder.encode(dto.getPassword()));
        user.setGender(dto.getGender());
        user.setPhone(dto.getPhone());
        user.setBirthday(dto.getBirthday());
        user.setMbti(dto.getMbti());
        user.setProfileImgUrl(dto.getProfileImgUrl());
    }

    //회원탈퇴
    @Transactional
    public void deleteUser(String email) {
        if(!userRepository.existsById(email)) {
            throw new IllegalArgumentException("해당 사용자가 존재하지 않습니다.");
        }

        userRepository.deleteById(email);
    }

    public DetailDto getProfile(String nickname, CustomUserDetails userDetails) {
        // 내 프로필
        if (nickname == null) {
            if (userDetails == null) {
                throw new IllegalArgumentException("로그인이 필요합니다.");
            }
            nickname = userDetails.getNickname();
        }

        // 닉네임으로 유저 찾기
        User user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new IllegalArgumentException("해당 닉네임의 사용자를 찾을 수 없습니다."));

        return new DetailDto(user);
    }
}
