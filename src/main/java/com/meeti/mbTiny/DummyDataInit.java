//package com.meeti.mbTiny;
//
//import com.meeti.mbTiny.entity.*;
//import com.meeti.mbTiny.repository.*;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.*;
//import java.util.Random;
//@Component
//@RequiredArgsConstructor
//public class DummyDataInit implements CommandLineRunner {
//
//    private final MemberRepository memberRepository;
//    private final ChatRoomRepository chatRoomRepository;
//    private final MessageRepository messageRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final PostRepository postRepository;
//    @Value("${custom.default-profile-img:/uploads/profile/default.png}")
//    private String defaultProfileImage;
//
//    @Override
//    public void run(String... args) {
//        System.out.println("\uD83C\uDF1F DummyDataInit 실행됨");
//
//        List<Member> members = new ArrayList<>();
//
//        Member member1 = Member.builder()
//                .email("user1@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0001-0003")
//                .birthday(LocalDate.of(2000, 2, 2))
//                .nickname("구지준")
//                .mbti("ESFJ")
//                .address("제주")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member1));
//
//        Member member2 = Member.builder()
//                .email("user2@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0002-0006")
//                .birthday(LocalDate.of(2000, 3, 3))
//                .nickname("김아기")
//                .mbti("INTJ")
//                .address("경기")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member2));
//
//        Member member3 = Member.builder()
//                .email("user3@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0003-0009")
//                .birthday(LocalDate.of(2000, 4, 4))
//                .nickname("최하기")
//                .mbti("INFP")
//                .address("서울")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member3));
//
//        Member member4 = Member.builder()
//                .email("user4@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0004-0012")
//                .birthday(LocalDate.of(2000, 5, 5))
//                .nickname("양보호")
//                .mbti("ISTJ")
//                .address("서울")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member4));
//
//        Member member5 = Member.builder()
//                .email("user5@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0005-0015")
//                .birthday(LocalDate.of(2000, 6, 6))
//                .nickname("구유빈")
//                .mbti("ENTP")
//                .address("충북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member5));
//
//        Member member6 = Member.builder()
//                .email("user6@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0006-0018")
//                .birthday(LocalDate.of(2000, 7, 7))
//                .nickname("최도은")
//                .mbti("ENTP")
//                .address("제주")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member6));
//
//        Member member7 = Member.builder()
//                .email("user7@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0007-0021")
//                .birthday(LocalDate.of(2000, 8, 8))
//                .nickname("양지훈")
//                .mbti("ENFP")
//                .address("대구")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member7));
//
//        Member member8 = Member.builder()
//                .email("user8@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0008-0024")
//                .birthday(LocalDate.of(2000, 9, 9))
//                .nickname("신현준")
//                .mbti("ISFP")
//                .address("충남")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member8));
//
//        Member member9 = Member.builder()
//                .email("user9@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0009-0027")
//                .birthday(LocalDate.of(2000, 10, 10))
//                .nickname("한현빈")
//                .mbti("INFP")
//                .address("충남")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member9));
//
//        Member member10 = Member.builder()
//                .email("user10@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0010-0030")
//                .birthday(LocalDate.of(2000, 11, 11))
//                .nickname("최보은")
//                .mbti("ISFP")
//                .address("전남")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member10));
//
//        Member member11 = Member.builder()
//                .email("user11@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0011-0033")
//                .birthday(LocalDate.of(2000, 12, 12))
//                .nickname("양지은")
//                .mbti("ISFP")
//                .address("부산")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member11));
//
//        Member member12 = Member.builder()
//                .email("user12@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0012-0036")
//                .birthday(LocalDate.of(2000, 1, 13))
//                .nickname("신유영")
//                .mbti("ENTP")
//                .address("충북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member12));
//
//        Member member13 = Member.builder()
//                .email("user13@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0013-0039")
//                .birthday(LocalDate.of(2000, 2, 14))
//                .nickname("구보연")
//                .mbti("ISFP")
//                .address("충남")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member13));
//
//        Member member14 = Member.builder()
//                .email("user14@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0014-0042")
//                .birthday(LocalDate.of(2000, 3, 15))
//                .nickname("양수연")
//                .mbti("ISTJ")
//                .address("충북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member14));
//
//        Member member15 = Member.builder()
//                .email("user15@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0015-0045")
//                .birthday(LocalDate.of(2000, 4, 16))
//                .nickname("정현기")
//                .mbti("ENTP")
//                .address("경기")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member15));
//
//        Member member16 = Member.builder()
//                .email("user16@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0016-0048")
//                .birthday(LocalDate.of(2000, 5, 17))
//                .nickname("정보연")
//                .mbti("ISFP")
//                .address("전북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member16));
//
//        Member member17 = Member.builder()
//                .email("user17@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0017-0051")
//                .birthday(LocalDate.of(2000, 6, 18))
//                .nickname("김유영")
//                .mbti("ENTP")
//                .address("부산")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member17));
//
//        Member member18 = Member.builder()
//                .email("user18@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0018-0054")
//                .birthday(LocalDate.of(2000, 7, 19))
//                .nickname("한서빈")
//                .mbti("ESTJ")
//                .address("제주")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member18));
//
//        Member member19 = Member.builder()
//                .email("user19@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0019-0057")
//                .birthday(LocalDate.of(2000, 8, 20))
//                .nickname("최보빈")
//                .mbti("ESTJ")
//                .address("전남")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member19));
//
//        Member member20 = Member.builder()
//                .email("user20@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0020-0060")
//                .birthday(LocalDate.of(2000, 9, 21))
//                .nickname("김민기")
//                .mbti("ENFP")
//                .address("부산")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member20));
//
//        Member member21 = Member.builder()
//                .email("user21@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0021-0063")
//                .birthday(LocalDate.of(2000, 10, 22))
//                .nickname("박수경")
//                .mbti("ENFP")
//                .address("충북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member21));
//
//        Member member22 = Member.builder()
//                .email("user22@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0022-0066")
//                .birthday(LocalDate.of(2000, 11, 23))
//                .nickname("신지빈")
//                .mbti("ISFP")
//                .address("충남")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member22));
//
//        Member member23 = Member.builder()
//                .email("user23@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0023-0069")
//                .birthday(LocalDate.of(2000, 12, 24))
//                .nickname("한도은")
//                .mbti("INTJ")
//                .address("전북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member23));
//
//        Member member24 = Member.builder()
//                .email("user24@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0024-0072")
//                .birthday(LocalDate.of(2000, 1, 25))
//                .nickname("최수경")
//                .mbti("ENTP")
//                .address("제주")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member24));
//
//        Member member25 = Member.builder()
//                .email("user25@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0025-0075")
//                .birthday(LocalDate.of(2000, 2, 26))
//                .nickname("구민라")
//                .mbti("ISTJ")
//                .address("제주")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member25));
//
//        Member member26 = Member.builder()
//                .email("user26@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0026-0078")
//                .birthday(LocalDate.of(2000, 3, 27))
//                .nickname("신보빈")
//                .mbti("ESFJ")
//                .address("제주")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member26));
//
//        Member member27 = Member.builder()
//                .email("user27@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0027-0081")
//                .birthday(LocalDate.of(2000, 4, 28))
//                .nickname("양아빈")
//                .mbti("ESTJ")
//                .address("충남")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member27));
//
//        Member member28 = Member.builder()
//                .email("user28@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0028-0084")
//                .birthday(LocalDate.of(2000, 5, 1))
//                .nickname("정현준")
//                .mbti("INTJ")
//                .address("대구")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member28));
//
//        Member member29 = Member.builder()
//                .email("user29@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0029-0087")
//                .birthday(LocalDate.of(2000, 6, 2))
//                .nickname("양민빈")
//                .mbti("ESFJ")
//                .address("서울")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member29));
//
//        Member member30 = Member.builder()
//                .email("user30@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0030-0090")
//                .birthday(LocalDate.of(2000, 7, 3))
//                .nickname("신서영")
//                .mbti("ENTP")
//                .address("전남")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member30));
//
//        Member member31 = Member.builder()
//                .email("user31@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0031-0093")
//                .birthday(LocalDate.of(2000, 8, 4))
//                .nickname("이하훈")
//                .mbti("ISFP")
//                .address("대구")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member31));
//
//        Member member32 = Member.builder()
//                .email("user32@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0032-0096")
//                .birthday(LocalDate.of(2000, 9, 5))
//                .nickname("정수준")
//                .mbti("ESTJ")
//                .address("충북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member32));
//
//        Member member33 = Member.builder()
//                .email("user33@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0033-0099")
//                .birthday(LocalDate.of(2000, 10, 6))
//                .nickname("이서경")
//                .mbti("ESFJ")
//                .address("경기")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member33));
//
//        Member member34 = Member.builder()
//                .email("user34@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0034-0102")
//                .birthday(LocalDate.of(2000, 11, 7))
//                .nickname("한현영")
//                .mbti("ISFP")
//                .address("충남")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member34));
//
//        Member member35 = Member.builder()
//                .email("user35@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0035-0105")
//                .birthday(LocalDate.of(2000, 12, 8))
//                .nickname("정수라")
//                .mbti("ESTJ")
//                .address("서울")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member35));
//
//        Member member36 = Member.builder()
//                .email("user36@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0036-0108")
//                .birthday(LocalDate.of(2000, 1, 9))
//                .nickname("한유영")
//                .mbti("ISFP")
//                .address("충북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member36));
//
//        Member member37 = Member.builder()
//                .email("user37@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0037-0111")
//                .birthday(LocalDate.of(2000, 2, 10))
//                .nickname("김민준")
//                .mbti("INTJ")
//                .address("대구")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member37));
//
//        Member member38 = Member.builder()
//                .email("user38@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0038-0114")
//                .birthday(LocalDate.of(2000, 3, 11))
//                .nickname("최수빈")
//                .mbti("ENTP")
//                .address("경기")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member38));
//
//        Member member39 = Member.builder()
//                .email("user39@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0039-0117")
//                .birthday(LocalDate.of(2000, 4, 12))
//                .nickname("신현기")
//                .mbti("INTJ")
//                .address("충북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member39));
//
//        Member member40 = Member.builder()
//                .email("user40@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0040-0120")
//                .birthday(LocalDate.of(2000, 5, 13))
//                .nickname("한보준")
//                .mbti("ESTJ")
//                .address("대구")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member40));
//
//        Member member41 = Member.builder()
//                .email("user41@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0041-0123")
//                .birthday(LocalDate.of(2000, 6, 14))
//                .nickname("박서연")
//                .mbti("ENTP")
//                .address("서울")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member41));
//
//        Member member42 = Member.builder()
//                .email("user42@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0042-0126")
//                .birthday(LocalDate.of(2000, 7, 15))
//                .nickname("정도은")
//                .mbti("ISFP")
//                .address("충북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member42));
//
//        Member member43 = Member.builder()
//                .email("user43@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0043-0129")
//                .birthday(LocalDate.of(2000, 8, 16))
//                .nickname("신민은")
//                .mbti("ESFJ")
//                .address("충북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member43));
//
//        Member member44 = Member.builder()
//                .email("user44@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0044-0132")
//                .birthday(LocalDate.of(2000, 9, 17))
//                .nickname("신도준")
//                .mbti("ESTJ")
//                .address("서울")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member44));
//
//        Member member45 = Member.builder()
//                .email("user45@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0045-0135")
//                .birthday(LocalDate.of(2000, 10, 18))
//                .nickname("최현은")
//                .mbti("ESFJ")
//                .address("전북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member45));
//
//        Member member46 = Member.builder()
//                .email("user46@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0046-0138")
//                .birthday(LocalDate.of(2000, 11, 19))
//                .nickname("김수훈")
//                .mbti("INTJ")
//                .address("전북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member46));
//
//        Member member47 = Member.builder()
//                .email("user47@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0047-0141")
//                .birthday(LocalDate.of(2000, 12, 20))
//                .nickname("한아경")
//                .mbti("ESFJ")
//                .address("충북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member47));
//
//        Member member48 = Member.builder()
//                .email("user48@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0048-0144")
//                .birthday(LocalDate.of(2000, 1, 21))
//                .nickname("김현경")
//                .mbti("ENTP")
//                .address("대구")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member48));
//
//        Member member49 = Member.builder()
//                .email("user49@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("male")
//                .phone("010-0049-0147")
//                .birthday(LocalDate.of(2000, 2, 22))
//                .nickname("양지영")
//                .mbti("ENFP")
//                .address("서울")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member49));
//
//        Member member50 = Member.builder()
//                .email("user50@example.com")
//                .password(passwordEncoder.encode("1234"))
//                .gender("female")
//                .phone("010-0050-0150")
//                .birthday(LocalDate.of(2000, 3, 23))
//                .nickname("이하빈")
//                .mbti("ESTJ")
//                .address("전북")
//                .profileImgUrl(defaultProfileImage)
//                .build();
//        members.add(memberRepository.save(member50));
//        // ✅ 채팅방: 앞 3명 조합으로만 예시 채팅 생성
//        // ✅ 채팅방 및 메시지 생성 함수 호출
//        initializeChatRoomsAndMessages(members);
//        generateDummyPosts(members);
//        System.out.println("✅ 더미 유저 50명, 채팅방 6개, 메시지 각 5~7줄 생성 완료!");
//    }
//
//    private void initializeChatRoomsAndMessages(List<Member> members) {
//        Member user1 = members.get(0); // user1
//        Member[] partners = {members.get(1), members.get(2), members.get(3), members.get(4)}; // user2 ~ user5
//
//        String[][] sampleConvos = {
//                {"안녕~ 오늘 뭐해?", "나 그냥 집에 있어~", "심심한데 뭐하지?", "우리 영화 볼까?", "좋아! 넷플릭스 켜줘"},
//                {"오늘 점심 뭐 먹었어?", "김치찌개 먹었어!", "오 맛있겠다", "너는?", "난 샌드위치~"},
//                {"오늘 날씨 진짜 좋지?", "응! 나 산책 다녀왔어", "헐 어디?", "집 앞 공원~", "걷기 딱 좋았겠다"},
//                {"주말에 뭐해?", "아직 계획 없어!", "같이 볼링 갈래?", "콜~ 어디서?", "역 근처 볼링장 어때?"}
//        };
//
//        for (int i = 0; i < partners.length; i++) {
//            Member partner = partners[i];
//
//            // 채팅방 생성
//            ChatRoom room = chatRoomRepository.save(ChatRoom.builder()
//                    .sender(user1)
//                    .receiver(partner)
//                    .build());
//
//            // 메시지 저장 (짝수: user1, 홀수: 상대)
//            String[] convo = sampleConvos[i % sampleConvos.length];
//            for (int j = 0; j < convo.length; j++) {
//                messageRepository.save(Message.builder()
//                        .chatRoom(room)
//                        .sender(j % 2 == 0 ? user1 : partner)
//                        .content(convo[j])
//                        .build());
//            }
//        }
//    }
//    private void generateDummyPosts(List<Member> members) {
//        String[] feedContents = {
//                "오늘 날씨 너무 좋아서 산책했어요", "카페에서 커피 한 잔 ☕", "운동 다녀왔어요!", "퇴근하고 피곤한 하루 끝~",
//                "강아지랑 산책 중 🐶", "좋아하는 책 읽는 중", "비오는 날의 감성 🌧", "친구랑 저녁 먹었어요", "드라이브 가는 길 🚗",
//                "새로 산 옷 입어봤어요", "헬스장에서 땀 뻘뻘💦", "요즘 하는 게임 너무 재밌어요", "방 청소 완료!", "피자 먹고싶다 🍕",
//                "아침 조깅 굿", "오늘은 혼밥", "전시회 다녀왔어요", "바닷가 사진 📷", "햇살 좋은 날 🌞", "치킨이 최고"
//        };
//
//        String[] anonContents = {
//                "나 요즘 너무 외로워", "친구랑 싸웠어..", "진짜 세상에 나만 혼자인 기분", "요즘 다 귀찮다",
//                "내가 잘못한 걸까?", "누구한테 털어놓고 싶은데 말 못 하겠어", "학교 가기 싫다", "이직 고민 중",
//                "그냥 누가 나한테 힘내라고 말해줬으면", "모두가 나보다 잘 사는 것 같아", "시험 망했다", "집에 가고 싶다",
//                "무기력함이 계속돼", "부모님께 말 못할 고민이 있어", "연애가 너무 어렵다", "내가 뭘 좋아하는지도 모르겠어",
//                "혼자 여행 가고 싶다", "지금 너무 지쳤다", "위로 받고 싶어", "하루하루 버티는 중이야"
//        };
//
//        LocalDateTime baseTime = LocalDateTime.of(2025, 5, 7, 15, 0);
//        Random random = new Random();
//
//        for (int i = 0; i < 20; i++) {
//            Post post = Post.builder()
//                    .title(null)
//                    .content(feedContents[i])
//                    .imageUrl(null)
//                    .isAnonymous(false)
//                    .viewCount((long) random.nextInt(100))
//                    .member(members.get(random.nextInt(members.size())))
//                    .createdAt(baseTime.plusMinutes(i))
//                    .updatedAt(baseTime.plusMinutes(i))
//                    .build();
//            postRepository.save(post);
//        }
//
//        for (int i = 0; i < 20; i++) {
//            Post post = Post.builder()
//                    .title("익명 고민 #" + (i + 1))
//                    .content(anonContents[i])
//                    .imageUrl(null)
//                    .isAnonymous(true)
//                    .viewCount((long) random.nextInt(100))
//                    .member(members.get(random.nextInt(members.size())))
//                    .createdAt(baseTime.plusMinutes(30 + i))
//                    .updatedAt(baseTime.plusMinutes(30 + i))
//                    .build();
//            postRepository.save(post);
//        }
//    }
//
//
//    private String getMbtiByIndex(int i) {
//        String[] mbtis = {"INTJ", "INFP", "ENFP", "ISTJ", "ENTP", "ISFP", "ESFJ", "ESTJ"};
//        return mbtis[i % mbtis.length];
//    }
//}
//
