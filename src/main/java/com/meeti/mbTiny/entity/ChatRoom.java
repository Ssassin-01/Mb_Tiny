package com.meeti.mbTiny.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 1:1 채팅 기준: 두 명의 사용자 ID 저장
    @ManyToOne(fetch = FetchType.LAZY)
    private Member sender; // 방을 만든 사람 (또는 사용자1)

    @ManyToOne(fetch = FetchType.LAZY)
    private Member receiver; // 대화 상대 (사용자2)

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

}