package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.PostDTO;
import com.meeti.mbTiny.dto.PostRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Post;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.PostService;
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

    //일단 익명/비익명 둘다 조회됨
    @GetMapping("/filter/mbti")
    public ResponseEntity<List<PostDTO>> getPostsByMBTI(
            @RequestParam(defaultValue = "all") String IorE,
            @RequestParam(defaultValue = "all") String NorS,
            @RequestParam(defaultValue = "all") String TorF,
            @RequestParam(defaultValue = "all") String JorP,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Optional<Member> optionalMember = userDetails != null ? Optional.of(userDetails.getMember()) : Optional.empty();
        List<PostDTO> posts = postService.getPostsByMBTI(IorE, NorS, TorF, JorP,optionalMember);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<PostDTO>> getPostsByLikeCount(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Optional<Member> optionalMember = userDetails != null ? Optional.of(userDetails.getMember()) : Optional.empty();
        List<PostDTO> res = postService.getPostsByLikeCount(optionalMember);
        return ResponseEntity.ok(res);
    }

    // 익명이 아닌 사람들의 피드 전체 조회
    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Optional<Member> optionalMember = userDetails != null ? Optional.of(userDetails.getMember()) : Optional.empty();
        List<PostDTO> res = postService.getPostsByAnonymous(false, optionalMember);
        return ResponseEntity.ok(res);
    }
    
    
    //익명인사람 전체 조회
    @GetMapping("/anonymous")
    public ResponseEntity<List<PostDTO>> getAnonymousPosts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Optional<Member> optionalMember = userDetails != null ? Optional.of(userDetails.getMember()) : Optional.empty();
        List<PostDTO> posts = postService.getPostsByAnonymous(true, optionalMember);
        return ResponseEntity.ok(posts);
    }

    


    
}
