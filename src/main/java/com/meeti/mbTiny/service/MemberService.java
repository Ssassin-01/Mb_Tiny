package com.meeti.mbTiny.service;

import com.meeti.mbTiny.dto.MemberDTO;
import com.meeti.mbTiny.dto.MemberRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signup(MemberRequestDTO dto) {
        if(memberRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        if(memberRepository.existsByNickname(dto.getNickname())) {
            throw new IllegalArgumentException("이미 사용중인 닉네임입니다.");
        }

        Member member = new Member();

        member.setEmail(dto.getEmail());
        member.setPassword(passwordEncoder.encode(dto.getPassword()));
        member.setGender(dto.getGender());
        member.setPhone(dto.getPhone());
        member.setBirthday(dto.getBirthday());
        member.setNickname(dto.getNickname());
        member.setMbti(dto.getMbti());
        memberRepository.save(member);
    }


    //회원정보 수정
    @Transactional
    public void updateUser(Member member, MemberRequestDTO dto) {

        member.setPassword(passwordEncoder.encode(dto.getPassword()));
        member.setGender(dto.getGender());
        member.setPhone(dto.getPhone());
        member.setBirthday(dto.getBirthday());
        member.setMbti(dto.getMbti());
    }

    //회원탈퇴
    @Transactional
    public void deleteUser(Member member) {
        memberRepository.delete(member);
    }

    public MemberDTO getMyProfile(Member member) {
        return convertToDTO(member);
    }

    public MemberDTO getOtherProfile(String nickname) {
        Member member = memberRepository.findByNickname(nickname)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));
        return convertToDTO(member);
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
    private MemberDTO convertToDTO(Member member) {
        return MemberDTO.builder()
                .email(member.getEmail())
                .nickname(member.getNickname())
                .mbti(member.getMbti())
                .profileImgUrl(member.getProfileImgUrl())
                .gender(member.getGender())
                .birthday(member.getBirthday())
                .createdAt(member.getCreateAt())
                .updatedAt(member.getUpdateAt())
                .build();
    }
}
