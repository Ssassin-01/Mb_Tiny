package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.PostDTO;
import com.meeti.mbTiny.dto.PostRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    @PostMapping
    public ResponseEntity<?> createPost(@Valid @RequestBody PostRequestDTO dto,
                                        @AuthenticationPrincipal CustomUserDetails userDetails) {
        Member member = userDetails.getMember();
        postService.createPost(dto, member);
        return ResponseEntity.ok(Map.of("message", "게시글 작성 완료"));
    }
    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        List<PostDTO> res = postService.getAllPosts();
        return ResponseEntity.ok(res);
    }
    @GetMapping("{postId}")
    public ResponseEntity<PostDTO> getPost(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Member member = userDetails.getMember();
        PostDTO res = postService.getPost(postId, member.getNickname());
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<?> updatePost(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails, @Valid @RequestBody PostRequestDTO dto) {
        Member member = userDetails.getMember();
        postService.updatePost(postId, member, dto);
        return ResponseEntity.ok(Map.of("message", "success"));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Member member = userDetails.getMember();
        postService.deletePost(postId, member);
        return ResponseEntity.ok(Map.of("message", "success"));
    }
}
