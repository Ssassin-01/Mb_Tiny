package com.meeti.mbTiny.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vote {
    //미완성
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

//    @ManyToOne
//    private User createdBy;
//
//    private LocalDateTime createdAt;
//
//    @OneToMany(mappedBy = "vote")
//    private List<VoteOption> options;
}
