package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.PostRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Post;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<?> createPost(@Valid @RequestBody PostRequestDTO dto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("🎯 authentication: " + authentication);
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("로그인이 필요합니다");
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Member member = userDetails.getMember();

        postService.createPost(dto, member);
        return ResponseEntity.ok(Map.of("message", "게시글 작성"));
    }
}
