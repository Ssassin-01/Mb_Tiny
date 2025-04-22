//package com.meeti.mbTiny.trash;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig1 {
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable()) // CSRF 보안 비활성화 (React랑 API 연동시 보통 꺼둠)
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/users/**").permitAll() // 로그인, 회원가입 API는 인증 없이 허용
//                        .anyRequest().authenticated() // 그 외 요청은 인증 필요
//                )
//                .formLogin(form -> form.disable()) // 기본 로그인 폼 비활성화 (우리는 REST API로 할 거니까)
//                .httpBasic(httpBasic -> httpBasic.disable()); // Basic 인증도 비활성화
//
//        return http.build();
//    }
//}
