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

import javax.swing.text.html.Option;
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
        postService.createPost(dto,  userDetails.getMember());
        return ResponseEntity.ok(Map.of("message", "게시글 작성 완료"));
    }
    @PutMapping("/{postId}")
    public ResponseEntity<?> updatePost(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails, @Valid @RequestBody PostRequestDTO dto) {
        postService.updatePost(postId, userDetails.getMember(), dto);
        return ResponseEntity.ok(Map.of("message", "success"));
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
