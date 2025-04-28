package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.CommentDTO;
import com.meeti.mbTiny.dto.CommentsRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/anonymous-posts/{postId}/comments")
@RequiredArgsConstructor
public class AnonymousCommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<?> createComment(@PathVariable Long postId, @Valid @RequestBody CommentsRequestDTO dto, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Member member = userDetails.getMember();
        commentService.createComment(postId, dto, member, true);
        return ResponseEntity.ok(Map.of("message", "success"));
    }

    @GetMapping
    public ResponseEntity<List<CommentDTO>> getComment(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Member member = userDetails.getMember();
        List<CommentDTO> res = commentService.getComment(postId, member, true);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(@PathVariable Long postId, @PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails, @Valid @RequestBody CommentsRequestDTO dto) {
        Member member = userDetails.getMember();
        commentService.updateComment(postId, id, member, dto, true);
        return ResponseEntity.ok(Map.of("message", "success"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long postId, @PathVariable Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Member member = userDetails.getMember();
        commentService.deleteComment(postId, id, member, true);
        return ResponseEntity.ok(Map.of("message", "success"));
    }
}
