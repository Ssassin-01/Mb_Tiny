package com.meeti.mbTiny.service;

import com.meeti.mbTiny.dto.MemberRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    public void signup(MemberRequestDTO dto) {
        if(memberRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        if(memberRepository.existsByUsername(dto.getUsername())) {
            throw new IllegalArgumentException("이미 존재하는 유저이름 입니다.");
        }

        Member member = Member.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .nickname(dto.getNickname())
                .username(dto.getUsername())
                .gender(dto.getGender())
                .build();
        memberRepository.save(member);
    }

}
