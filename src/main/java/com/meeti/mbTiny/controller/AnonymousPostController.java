package com.meeti.mbTiny.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meeti.mbTiny.dto.PostDTO;
import com.meeti.mbTiny.dto.PostRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.AnonymousPostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/anonymous-posts")
public class AnonymousPostController {
    private final AnonymousPostService anonymousPostService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPost(
            @RequestPart("postData") String postDataJson,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            PostRequestDTO dto = mapper.readValue(postDataJson, PostRequestDTO.class); // 직접 파싱

            anonymousPostService.createPost(dto, image, userDetails.getMember());
            return ResponseEntity.ok(Map.of("message", "게시글 작성 완료"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
    @PutMapping(value = "/{postId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updatePost(
            @PathVariable Long postId,
            @RequestPart("postData") String postDataJson,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            PostRequestDTO dto = mapper.readValue(postDataJson, PostRequestDTO.class);

            anonymousPostService.updatePost(postId, userDetails.getMember(), dto, image);
            return ResponseEntity.ok(Map.of("message", "게시글 수정 완료"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
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
