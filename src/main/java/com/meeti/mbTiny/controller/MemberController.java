    package com.meeti.mbTiny.controller;

    import com.meeti.mbTiny.dto.LoginRequestDTO;
    import com.meeti.mbTiny.dto.MemberDTO;
    import com.meeti.mbTiny.dto.MemberRequestDTO;
    import com.meeti.mbTiny.dto.MemberUpdateRequestDTO;
    import com.meeti.mbTiny.entity.Member;
    import com.meeti.mbTiny.security.CustomUserDetails;
    import com.meeti.mbTiny.service.MemberService;
    import jakarta.servlet.http.Cookie;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;
    import jakarta.validation.Valid;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.MediaType;
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
    import org.springframework.web.multipart.MultipartFile;


    import java.util.List;
    import java.util.Map;

    @RestController
    @RequestMapping("/api/members")
    @RequiredArgsConstructor
    public class MemberController {
        private final MemberService memberService;
        private final AuthenticationManager authenticationManager;

        @PostMapping("/register")
        public ResponseEntity<Map<String, String>> signUp(@Valid @RequestBody MemberRequestDTO dto) {
            memberService.signup(dto);
            return ResponseEntity.ok(Map.of("message", "회원가입 성공"));
        }

        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody LoginRequestDTO dto, HttpServletRequest request) {
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());

            try {
                Authentication authentication = authenticationManager.authenticate(token);
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                context.setAuthentication(authentication);

                request.getSession(true)
                        .setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);

                return ResponseEntity.ok(Map.of("message", "로그인 성공"));
            } catch (BadCredentialsException e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "이메일 또는 비밀번호가 잘못되었습니다."));
            }
        }

        @GetMapping("/me")
        public ResponseEntity<MemberDTO> getMyProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
            Member member = userDetails.getMember();
            MemberDTO profile = memberService.getMyProfile(member);
            return ResponseEntity.ok(profile);
        }

        @GetMapping("/{nickname}")
        public ResponseEntity<MemberDTO> getOtherProfile(@PathVariable String nickname) {
            MemberDTO profile = memberService.getOtherProfile(nickname);
            return ResponseEntity.ok(profile);
        }

        //회원정보 수정
        @PutMapping("/modify")
        public ResponseEntity<?> modifyProfile(@ModelAttribute MemberUpdateRequestDTO dto,
                                               @AuthenticationPrincipal CustomUserDetails userDetails) {
            MultipartFile profileImg = dto.getProfileImg();
            System.out.println(dto.getProfileImg());
            System.out.println(profileImg);

            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
            }

            memberService.updateUser(userDetails.getUsername(), dto);
            return ResponseEntity.ok("프로필이 수정되었습니다.");
        }

        //회원 탈퇴
        @DeleteMapping("/delete")
        public ResponseEntity<?> deleteUser(@AuthenticationPrincipal CustomUserDetails userDetails,
                                            HttpServletRequest request, HttpServletResponse response) {
            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
            }
            memberService.deleteUser(userDetails.getMember());

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




        @GetMapping("/filter/mbti")
        public ResponseEntity<List<Member>> getMembersByMBTI(
                @RequestParam(defaultValue = "all") String IorE,
                @RequestParam(defaultValue = "all") String NorS,
                @RequestParam(defaultValue = "all") String TorF,
                @RequestParam(defaultValue = "all") String JorP
        ) {
            List<Member> filtered = memberService.getMembersByMBTI(IorE, NorS, TorF, JorP);
            return ResponseEntity.ok(filtered);
        }


    }
