package com.meeti.mbTiny.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF 보안 비활성화 (React랑 API 연동시 보통 꺼둠)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/login","/api/users/logout","/api/users/register").permitAll() // 로그인, 회원가입 API는 인증 없이 허용
                        .anyRequest().authenticated() // 그 외 요청은 인증 필요

                )
                .formLogin(form -> form.disable()) // 기본 로그인 폼 비활성화 (우리는 REST API로 할 거니까)
                .logout(logout -> logout
                        .logoutUrl("/api/users/logout") // 이 URL로 POST 요청만 하면 로그아웃 처리
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setCharacterEncoding("UTF-8"); // 🔥 한글 깨짐 방지
                            response.setContentType("text/plain; charset=UTF-8");
                            response.setStatus(HttpServletResponse.SC_OK);
                            response.getWriter().write("로그아웃 되었습니다");
                        })
                        .invalidateHttpSession(true) // 세션 무효화
                        .deleteCookies("JSESSIONID") // 쿠키도 삭제
                );
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager (AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
