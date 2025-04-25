package com.meeti.mbTiny.service;

import com.meeti.mbTiny.dto.FollowDTO;
import com.meeti.mbTiny.entity.Follow;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.repository.FollowRepository;
import com.meeti.mbTiny.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    public void follow(Member follower, Long followingId) {
        Member following = memberRepository.findById(followingId)
                .orElseThrow(() -> new IllegalArgumentException("팔로우 대상 사용자가 존재하지 않습니다."));
        if (follower.getId().equals(following.getId())) {
            throw new IllegalArgumentException("자기 자신은 팔로우할 수 없습니다.");
        }
        boolean alreadyFollowing = followRepository.existsByFollowerAndFollowing(follower, following);
        if(alreadyFollowing) {
            throw new IllegalArgumentException("이미 팔로우 중입니다.");
        }
        Follow follow = Follow.builder()
                .follower(follower)
                .following(following)
                .build();
        followRepository.save(follow);
    }

    public void unfollow(Member follower, Long followingId) {
        Member following = memberRepository.findById(followingId)
                .orElseThrow(() -> new IllegalArgumentException("팔로우 대상 사용자가 존재하지 않습니다."));

        Follow follow = followRepository.findByFollowerAndFollowing(follower, following)
                .orElseThrow(() -> new IllegalArgumentException("팔로우 관계가 존재하지 않습니다."));

        followRepository.delete(follow);
    }

    public List<FollowDTO> getFollowingDTOList(Member member) {
        return followRepository.findByFollower(member).stream()
                .map(f -> new FollowDTO(f.getFollowing()))
                .collect(Collectors.toList());
    }

    public List<FollowDTO> getFollowerDTOList(Member member) {
        return followRepository.findByFollowing(member).stream()
                .map(f -> new FollowDTO(f.getFollower()))
                .collect(Collectors.toList());
    }

}
