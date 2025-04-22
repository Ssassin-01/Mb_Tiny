package com.meeti.mbTiny.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MbtiType {

    @Id
    private String mbti;

    @Column(nullable = false)
    private String description;

    @Column(unique = true, nullable = false)
    private String compatibleMbti;

    @Column(nullable = false)
    private String compatibleDescription;
}
