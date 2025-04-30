package com.meeti.mbTiny;

import com.meeti.mbTiny.entity.ChatRoom;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Message;
import com.meeti.mbTiny.repository.ChatRoomRepository;
import com.meeti.mbTiny.repository.MemberRepository;
import com.meeti.mbTiny.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DummyDataInit implements CommandLineRunner {

    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        System.out.println("🌟 DummyDataInit 실행됨");

        Member user1 = memberRepository.save(Member.builder()
                .email("user1@example.com")
                .password(passwordEncoder.encode("1234"))
                .gender("male")
                .phone("010-1111-1111")
                .birthday(LocalDate.of(2000, 1, 1))
                .nickname("유저1")
                .mbti("INTJ")
                .address("서울")
                .build());

        Member user2 = memberRepository.save(Member.builder()
                .email("user2@example.com")
                .password(passwordEncoder.encode("1234"))
                .gender("female")
                .phone("010-2222-2222")
                .birthday(LocalDate.of(2000, 2, 2))
                .nickname("유저2")
                .mbti("ENFP")
                .address("부산")
                .build());

        Member user3 = memberRepository.save(Member.builder()
                .email("user3@example.com")
                .password(passwordEncoder.encode("1234"))
                .gender("male")
                .phone("010-3333-3333")
                .birthday(LocalDate.of(2000, 3, 3))
                .nickname("유저3")
                .mbti("ISFP")
                .address("대구")
                .build());

        // 채팅방 3개 (조합: 1-2, 1-3, 2-3)
        List<ChatRoom> rooms = List.of(
                chatRoomRepository.save(ChatRoom.builder().sender(user1).receiver(user2).build()),
                chatRoomRepository.save(ChatRoom.builder().sender(user1).receiver(user3).build()),
                chatRoomRepository.save(ChatRoom.builder().sender(user2).receiver(user3).build())
        );

        int msgCount = 1;
        for (ChatRoom room : rooms) {
            for (int i = 1; i <= 3; i++) {
                messageRepository.save(Message.builder()
                        .chatRoom(room)
                        .sender(room.getSender()) // sender가 메시지 보낸 것으로 처리
                        .content("메시지 " + (msgCount++))
                        .build());
            }
        }

        System.out.println("✅ 더미 유저 3명, 채팅방 3개, 메시지 9개 생성 완료!");
    }
}
