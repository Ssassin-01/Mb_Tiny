package com.meeti.mbTiny.service;

import com.meeti.mbTiny.dto.MemberRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    public void signup(MemberRequestDTO dto) {
        if(memberRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        if(memberRepository.existsByNickname(dto.getNickname())) {
            throw new IllegalArgumentException("이미 존재하는 유저이름 입니다.");
        }

        Member member = Member.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .gender(dto.getGender())
                .phone(dto.getPhone())
                .birthday(dto.getBirthday())
                .nickname(dto.getNickname())
                .mbti(dto.getMbti())
                .build();
        memberRepository.save(member);
    }

    public List<Member> getMembersByMBTI(String IorE, String NorS, String TorF, String JorP) {
        return memberRepository.findAll().stream()
                .filter(member -> {
                    String mbti = Optional.ofNullable(member.getMbti()).orElse("").toUpperCase();
                    return mbti.length() == 4 &&
                            (IorE.equals("all") || mbti.startsWith(IorE)) &&
                            (NorS.equals("all") || mbti.charAt(1) == NorS.charAt(0)) &&
                            (TorF.equals("all") || mbti.charAt(2) == TorF.charAt(0)) &&
                            (JorP.equals("all") || mbti.charAt(3) == JorP.charAt(0));
                })
                .collect(Collectors.toList());
    }
}
