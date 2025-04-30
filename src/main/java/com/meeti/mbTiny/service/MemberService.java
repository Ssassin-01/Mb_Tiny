package com.meeti.mbTiny.service;

import com.meeti.mbTiny.dto.MemberDTO;
import com.meeti.mbTiny.dto.MemberListResponseDTO;
import com.meeti.mbTiny.dto.MemberRequestDTO;
import com.meeti.mbTiny.dto.MemberUpdateRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileUploadService fileUploadService;

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
        member.setAddress(dto.getAddress());
        memberRepository.save(member);
    }

    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        return (dotIndex != -1) ? fileName.substring(dotIndex) : "";
    }

    //회원정보 수정
    @Transactional
    public void updateUser(String email, MemberUpdateRequestDTO dto) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            member.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        if (dto.getGender() != null) {
            member.setGender(dto.getGender());
        }
        if (dto.getPhone() != null && !dto.getPhone().isBlank()) {
            member.setPhone(dto.getPhone());
        }
        if (dto.getBirthday() != null) {
            member.setBirthday(dto.getBirthday());
        }
        if (dto.getMbti() != null && !dto.getMbti().isBlank()) {
            member.setMbti(dto.getMbti());
        }

        MultipartFile profileImg = dto.getProfileImg();
        if (profileImg == null) {
        }
        else if (profileImg.isEmpty()) {
            if (member.getProfileImgUrl() != null) {
                fileUploadService.delete(member.getProfileImgUrl());
            }
            member.setProfileImgUrl(null);
        }
        else {
            if (member.getProfileImgUrl() != null) {
                fileUploadService.delete(member.getProfileImgUrl());
            }
            String imageUrl = fileUploadService.upload(profileImg, "profile");
            member.setProfileImgUrl(imageUrl);
        }

    }

    //회원탈퇴
    @Transactional
    public void deleteUser(Member member) {
        memberRepository.delete(member);
    }

    public MemberDTO getMyProfile(Member member) {
        Member me = memberRepository.findByNickname(member.getNickname())
                .orElseThrow(()-> new IllegalArgumentException("없는 사람입니다."));

        return convertToDTO(me);
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
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .mbti(member.getMbti())
                .profileImgUrl(member.getProfileImgUrl())
                .gender(member.getGender())
                .birthday(member.getBirthday())
                .address(member.getAddress())
                .phone(member.getPhone())
                .createdAt(member.getCreateAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")))
                .updatedAt(member.getUpdateAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")))
                .build();
    }

    public List<MemberDTO> searchByNickname(String keyword) {
        return memberRepository.findByNicknameContainingIgnoreCase(keyword)
                .stream()
                .map(member -> MemberDTO.builder()
                        .nickname(member.getNickname())
                        .profileImgUrl(member.getProfileImgUrl())
                        .build())
                .collect(Collectors.toList());
    }

    public String findExactNickname(String nickname) {
        return memberRepository.findByNicknameIgnoreCase(nickname)
                .map(Member::getNickname)
                .orElse(null);
    }

    public List<MemberListResponseDTO> getRandomMembers(int count) {
        List<Member> allMembers = memberRepository.findAll();

        Collections.shuffle(allMembers);

        List<Member> selectedMembers = allMembers.stream().limit(count).toList();

        return selectedMembers.stream()
                .map(member -> MemberListResponseDTO.builder()
                        .id(member.getId())
                        .nickname(member.getNickname())
                        .mbti(member.getMbti())
                        .followerCount(member.getFollowers().size())
                        .profileImgUrl(member.getProfileImgUrl())
                        .build()
                ).collect(Collectors.toList());
    }
    public List<MemberListResponseDTO> getRandomMembersByMBTI(int count, String IorE, String NorS, String TorF, String JorP) {
        List<Member> filtered = memberRepository.findAll().stream()
                        .filter(member -> {
                            String mbti = Optional.ofNullable(member.getMbti()).orElse("").toUpperCase();
                            return mbti.length() == 4 &&
                                    (IorE.equals("all") || mbti.startsWith(IorE)) &&
                                    (NorS.equals("all") || mbti.charAt(1) == NorS.charAt(0)) &&
                                    (TorF.equals("all") || mbti.charAt(2) == TorF.charAt(0)) &&
                                    (JorP.equals("all") || mbti.charAt(3) == JorP.charAt(0));
                        }).collect(Collectors.toList());

        Collections.shuffle(filtered);

        return filtered.stream()
                .limit(count)
                .map(member -> MemberListResponseDTO.builder()
                        .id(member.getId())
                        .nickname(member.getNickname())
                        .mbti(member.getMbti())
                        .followerCount(member.getFollowers().size())
                        .profileImgUrl(member.getProfileImgUrl())
                        .build()
                ).collect(Collectors.toList());
    }

    public Member getUpdatedMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일의 유저를 찾을 수 없습니다."));
    }
}
