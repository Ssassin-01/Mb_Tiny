package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.domain.User;
import com.meeti.mbTiny.dto.RegisterDto;
import com.meeti.mbTiny.dto.RoginDto;
import com.meeti.mbTiny.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@SessionAttributes("loginUser")
public class UserController {

    private final UserService userService;

    //회원가입
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDto requestDto) {
        User user = userService.register(requestDto);

        return ResponseEntity.ok("회원가입 성공 : "+ user.getEmail());
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody RoginDto dto, HttpSession session) {
        try {
            User user = userService.login(dto.getEmail(), dto.getPassword());
            session.setAttribute("loginUser", user); // 세션에 로그인 정보 저장

            return ResponseEntity.ok().body("로그인 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logOut(HttpSession session) {
        Object loginUser = session.getAttribute("loginUser");

        if (loginUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("로그인 상태가 아닙니다");
        }

        session.invalidate();
        return ResponseEntity.ok("로그아웃 되었습니다");
    }
}
