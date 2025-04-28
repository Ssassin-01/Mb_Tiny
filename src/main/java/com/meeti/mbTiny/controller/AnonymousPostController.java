package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.PostDTO;
import com.meeti.mbTiny.dto.PostRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.AnonymousPostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/anonymous-posts")
public class AnonymousPostController {
    private final AnonymousPostService anonymousPostService;

    @PostMapping
    public ResponseEntity<?> createPost(@AuthenticationPrincipal CustomUserDetails userDetails, @Valid @RequestBody PostRequestDTO dto) {
        anonymousPostService.createPost(userDetails.getMember(), dto);
        return ResponseEntity.ok(Map.of("message", "success"));
    }
    @PutMapping("/{postId}")
    public ResponseEntity<?> updatePost(@AuthenticationPrincipal CustomUserDetails userDetails, @Valid @RequestBody PostRequestDTO dto, @PathVariable Long postId) {
        anonymousPostService.updatePost(userDetails.getMember(), dto, postId);
        return ResponseEntity.ok(Map.of("message", "success"));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long postId) {
        anonymousPostService.deletePost(userDetails.getMember(), postId);
        return ResponseEntity.ok(Map.of("message", "success"));
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Optional<Member> member = userDetails != null ? Optional.of(userDetails.getMember()) : Optional.empty();
        List<PostDTO> posts = anonymousPostService.getAllPosts(member);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDTO> getPosts(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long postId) {
        PostDTO post = anonymousPostService.getPost(userDetails.getMember(), postId);
        return ResponseEntity.ok(post);
    }
}
