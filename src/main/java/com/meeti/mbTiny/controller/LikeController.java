package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/posts/{postId}")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/like")
    public ResponseEntity<?> toggleLike(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Member member = userDetails.getMember();
        boolean liked = likeService.toggleLike(postId, member);
        return ResponseEntity.ok(Map.of("like", liked));
    }

    @GetMapping("/like-count")
    public ResponseEntity<?> getLikeCount(@PathVariable Long postId) {
        Long count = likeService.getLikeCount(postId);
        return ResponseEntity.ok(Map.of("count", count));
    }
}
