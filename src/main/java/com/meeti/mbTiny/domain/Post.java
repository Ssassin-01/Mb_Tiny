package com.meeti.mbTiny.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(unique = true, nullable = false)
    private String writer;

    @Column(insertable=false, columnDefinition="INT DEFAULT 0")
    private Long viewCount;

    @CreatedDate
    @Column(name="create_date")
    private LocalDateTime createDate;

    @LastModifiedDate
    @Column(name="update_date")
    private LocalDateTime updateDate;
}
