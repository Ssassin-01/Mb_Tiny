package com.meeti.mbTiny.service;

import com.meeti.mbTiny.domain.User;
import com.meeti.mbTiny.dto.RegisterDto;
import com.meeti.mbTiny.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder pEncoder;

    public User register(RegisterDto dto) {
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

    public User login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("이메일이 존재하지 않습니다"));

        if(!pEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다");
        }

        return user;
    }
}
