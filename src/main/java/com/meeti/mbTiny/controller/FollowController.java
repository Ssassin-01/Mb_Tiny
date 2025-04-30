package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.FollowDTO;
import com.meeti.mbTiny.entity.Member;
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
    @PostMapping("/{targetId}")
    public ResponseEntity<?> follow(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long targetId) {
        followService.follow(userDetails.getMember(), targetId);
        return ResponseEntity.ok(Map.of("message", "follow ok"));
    }
    @DeleteMapping("/{targetId}")
    public ResponseEntity<?> unfollow(@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable Long targetId) {
        followService.unfollow(userDetails.getMember(), targetId);
        return ResponseEntity.ok(Map.of("message", "unfollow ok"));
    }

    @GetMapping("/following")
    public ResponseEntity<List<FollowDTO>> getFollowingList(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<FollowDTO> res = followService.getFollowingList(userDetails.getMember());
        return ResponseEntity.ok(res);
    }
    @GetMapping("/followers")
    public ResponseEntity<List<FollowDTO>> getFollowerList(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<FollowDTO> res = followService.getFollowerList(userDetails.getMember());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/count")
    public ResponseEntity<?> getFollowCounts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Member member = userDetails.getMember();
        long followers = followService.countFollowers(member);
        long following = followService.countFollowing(member);

        return ResponseEntity.ok(Map.of(
                "followers", followers,
                "following", following
        ));
    }

    @GetMapping("/count/{nickname}")
    public ResponseEntity<?> getFollowCountsByNickname(@PathVariable String nickname) {
        long followers = followService.countFollowersByNickname(nickname);
        long following = followService.countFollowingByNickname(nickname);

        return ResponseEntity.ok(Map.of(
                "followers", followers,
                "following", following
        ));
    }

}
