package com.meeti.mbTiny.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.meeti.mbTiny.dto.PostDTO;
import com.meeti.mbTiny.dto.PostRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Post;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createPost(
            @RequestPart("postData") String postDataJson,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            PostRequestDTO dto = mapper.readValue(postDataJson, PostRequestDTO.class); // 직접 파싱

            postService.createPost(dto, image, userDetails.getMember());
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

            postService.updatePost(postId, userDetails.getMember(), dto, image);
            return ResponseEntity.ok(Map.of("message", "게시글 수정 완료"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        postService.deletePost(postId, userDetails.getMember());
        return ResponseEntity.ok(Map.of("message", "success"));
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Optional<Member> member = userDetails != null ? Optional.of(userDetails.getMember()) : Optional.empty();
        List<PostDTO> posts = postService.getAllPosts(member);
        return ResponseEntity.ok(posts);
    }
    @GetMapping("/{postId}")
    public ResponseEntity<PostDTO> getPost(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        PostDTO res = postService.getPost(postId,  userDetails.getMember());
        return ResponseEntity.ok(res);
    }

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
}
