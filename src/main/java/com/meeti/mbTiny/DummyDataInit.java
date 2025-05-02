package com.meeti.mbTiny;

import com.meeti.mbTiny.entity.ChatRoom;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Message;
import com.meeti.mbTiny.repository.ChatRoomRepository;
import com.meeti.mbTiny.repository.MemberRepository;
import com.meeti.mbTiny.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DummyDataInit implements CommandLineRunner {

    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${custom.default-profile-img:/uploads/profile/default.png}")
    private String defaultProfileImage;

    @Override
    public void run(String... args) {
        System.out.println("\uD83C\uDF1F DummyDataInit 실행됨");

        List<Member> members = new ArrayList<>();

        for (int i = 1; i <= 30; i++) {
            Member member = Member.builder()
                    .email("user" + i + "@example.com")
                    .password(passwordEncoder.encode("1234"))
                    .gender(i % 2 == 0 ? "female" : "male")
                    .phone("010-" + String.format("%04d-%04d", i, i * 3))
                    .birthday(LocalDate.of(2000, (i % 12) + 1, (i % 28) + 1))
                    .nickname("유저" + i)
                    .mbti(getMbtiByIndex(i))
                    .address("도시" + i)
                    .profileImgUrl(defaultProfileImage)
                    .build();
            members.add(memberRepository.save(member));
        }

        // 채팅방: 앞 3명 조합으로만 예시 채팅 생성
        List<ChatRoom> rooms = List.of(
                chatRoomRepository.save(ChatRoom.builder().sender(members.get(0)).receiver(members.get(1)).build()),
                chatRoomRepository.save(ChatRoom.builder().sender(members.get(0)).receiver(members.get(2)).build()),
                chatRoomRepository.save(ChatRoom.builder().sender(members.get(1)).receiver(members.get(2)).build())
        );

        int msgCount = 1;
        for (ChatRoom room : rooms) {
            for (int i = 1; i <= 3; i++) {
                messageRepository.save(Message.builder()
                        .chatRoom(room)
                        .sender(room.getSender())
                        .content("메시지 " + (msgCount++))
                        .build());
            }
        }

        System.out.println("✅ 더미 유저 30명, 채팅방 3개, 메시지 9개 생성 완료!");
    }

    private String getMbtiByIndex(int i) {
        String[] mbtis = {"INTJ", "INFP", "ENFP", "ISTJ", "ENTP", "ISFP", "ESFJ", "ESTJ"};
        return mbtis[i % mbtis.length];
    }
}
