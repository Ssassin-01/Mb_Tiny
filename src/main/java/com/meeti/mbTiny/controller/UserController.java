package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.domain.User;
import com.meeti.mbTiny.dto.user.DetailDto;
import com.meeti.mbTiny.dto.user.ModifyDto;
import com.meeti.mbTiny.dto.user.RegisterDto;
import com.meeti.mbTiny.dto.user.LoginDto;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    //회원가입
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDto dto) {
        User user = userService.register(dto);

        return ResponseEntity.ok("회원가입 성공 : "+ user.getEmail());
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDto dto,  HttpServletRequest request) {
        try {
            // 1. 로그인 시도 중인 사용자 정보를 담는 Authentication 객체 생성
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
            );

            // 2. 인증 성공 → SecurityContext에 저장 → 로그인 상태 유지
            SecurityContextHolder.getContext().setAuthentication(authentication);

            request.getSession().setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    SecurityContextHolder.getContext()
            );

            // 3. 세션 저장은 선택 사항 (SecurityContext가 내부적으로 처리)
            return ResponseEntity.ok("로그인 성공");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }

    //프로필 조회
    @GetMapping({"/profile", "/profile/{nickname}"})
    public ResponseEntity<?> getProfile(@PathVariable(value = "nickname", required = false) String nickname,
                                        @AuthenticationPrincipal CustomUserDetails userDetails) {
        try {
            DetailDto dto = userService.getProfile(nickname, userDetails);
            return ResponseEntity.ok(dto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("알 수 없는 오류 발생");
        }
    }

    //회원정보 수정
    @PutMapping("/modify")
    public ResponseEntity<?> modifyProfile(@RequestBody ModifyDto dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }
        String email = userDetails.getEmail();
        userService.updateUser(email, dto);
        return ResponseEntity.ok("프로필이 수정되었습니다.");
    }

    //회원 탈퇴
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal CustomUserDetails userDetails,
                                        HttpServletRequest request, HttpServletResponse response) {
        System.out.println("delete controller 접근");
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        String email = userDetails.getEmail();
        userService.deleteUser(email);

        // 🔐 강제로 로그아웃 처리 (세션 무효화 + SecurityContext 초기화)
        request.getSession().invalidate();
        SecurityContextHolder.clearContext();

        // 선택: JSESSIONID 쿠키 삭제
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
    }
}
