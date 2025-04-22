//package com.meeti.mbTiny.domain;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.annotation.LastModifiedDate;
//import org.springframework.data.jpa.domain.support.AuditingEntityListener;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Entity
//@EntityListeners(AuditingEntityListener.class)
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class User {
//
//    @Id
//    private String email;
//
//    @Column(nullable = false)
//    private String password;
//
//    @Column(nullable = false)
//    private String gender;
//
//    @Column(nullable = false)
//    private String phone;
//
//    @Column(nullable = false)
//    private LocalDate birthday;
//
//    @Column(unique = true, nullable = false)
//    private String nickname;
//
//    private String mbti;
//
//    private String profileImgUrl;
//
//    @CreatedDate
//    @Column(name="create_date")
//    private LocalDateTime createDate;
//
//    @LastModifiedDate
//    @Column(name="update_date")
//    private LocalDateTime updateDate;
//
////    @OneToMany(mappedBy = "user")
////    private List<Post> posts;
//}
//
