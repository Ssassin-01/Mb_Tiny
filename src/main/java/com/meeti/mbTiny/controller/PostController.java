package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.PostDTO;
import com.meeti.mbTiny.dto.PostRequestDTO;
import com.meeti.mbTiny.dto.PostUpdateDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Post;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
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
        System.out.println("📌 [DEBUG] isAnonymous: " + dto.isAnonymous());
        Member member = userDetails.getMember();
        postService.createPost(dto, member);
        return ResponseEntity.ok(Map.of("message", "게시글 작성 완료"));
    }
    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        List<PostDTO> res = postService.getAllPosts();
        return ResponseEntity.ok(res);
    }
    @GetMapping("{id}")
    public ResponseEntity<PostDTO> getPost(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Member member = userDetails.getMember();
        PostDTO res = postService.getPost(id, member.getNickname());
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails, @Valid @RequestBody PostUpdateDTO dto) {
        Member member = userDetails.getMember();
        postService.updatePost(id, member, dto);
        return ResponseEntity.ok(Map.of("message", "success"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Member member = userDetails.getMember();
        postService.deletePost(id, member);
        return ResponseEntity.ok(Map.of("message", "success"));
    }
}
