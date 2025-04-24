package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.FollowDTO;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
public class FollowController {
    private final FollowService followService;

    //팔로우 하기
    @PostMapping("/{targetId}")
    public ResponseEntity<?> follow(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long targetId) {
        followService.follow(userDetails.getMember(), targetId);
        return ResponseEntity.ok(Map.of("message", "ok"));
    }

    //언팔로우 하기
    @DeleteMapping("/{targetId}")
    public ResponseEntity<?> unfollow(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long targetId) {
        followService.unfollow(userDetails.getMember(), targetId);
        return ResponseEntity.ok(Map.of("message", "ok"));
    }

    //팔로잉 목록 조회
    @GetMapping("/following")
    public ResponseEntity<List<FollowDTO>> getFollowingList(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<FollowDTO> res = followService.getFollowingList(userDetails.getMember());
        return ResponseEntity.ok(res);
    }

    //팔로워 목록 조회
    @GetMapping("/followers")
    public ResponseEntity<List<FollowDTO>> getFollowerList(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<FollowDTO> res = followService.getFollowerList(userDetails.getMember());
        return ResponseEntity.ok(res);
    }
}
