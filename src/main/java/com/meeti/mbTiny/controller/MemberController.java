    package com.meeti.mbTiny.controller;

    import com.meeti.mbTiny.dto.LoginRequestDTO;
    import com.meeti.mbTiny.dto.MemberRequestDTO;
    import com.meeti.mbTiny.entity.Member;
    import com.meeti.mbTiny.security.CustomUserDetails;
    import com.meeti.mbTiny.service.MemberService;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.validation.Valid;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.BadCredentialsException;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.core.Authentication;
    import org.springframework.security.core.annotation.AuthenticationPrincipal;
    import org.springframework.security.core.context.SecurityContext;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.security.web.context.HttpSessionSecurityContextRepository;


    import java.util.Map;

    @RestController
    @RequestMapping("/api/members")
    @RequiredArgsConstructor
    public class MemberController {
        private final MemberService memberService;
        private final AuthenticationManager authenticationManager;

        @PostMapping("/signup")
        public ResponseEntity<Map<String, String>> signUp(@Valid @RequestBody MemberRequestDTO dto) {
            memberService.signup(dto);
            return ResponseEntity.ok(Map.of("message", "success"));
        }

        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody LoginRequestDTO dto, HttpServletRequest request) {
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());

            try {
                Authentication authentication = authenticationManager.authenticate(token);
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                context.setAuthentication(authentication);

                // ✅ 명시적으로 세션에 SecurityContext 저장!
                request.getSession(true)
                        .setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);

                return ResponseEntity.ok(Map.of("message", "로그인 성공"));
            } catch (BadCredentialsException e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "이메일 또는 비밀번호가 잘못되었습니다."));
            }
        }

        @GetMapping("/me")
        public ResponseEntity<?> getMyInfo(@AuthenticationPrincipal CustomUserDetails userDetails) {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            if (auth == null || userDetails == null || auth.getPrincipal().equals("anonymousUser")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "로그인이 필요합니다."));
            }

            Member member = userDetails.getMember();
            return ResponseEntity.ok(Map.of(
                    "email", member.getEmail(),
                    "nickname", member.getNickname()
            ));
        }


    }
