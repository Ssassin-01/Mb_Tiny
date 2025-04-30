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
    private final NotificationService notificationService;
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
        if(!follower.getId().equals(following.getId())) {
            notificationService.sendNotification(following.getId(), follower.getNickname() + "님이 회원님을 하였습니다.");
        }
    }

    public void unfollow(Member follower, Long followingId) {
        Member following = memberRepository.findById(followingId)
                .orElseThrow(() -> new IllegalArgumentException("팔로우 대상 사용자가 존재하지 않습니다."));

        Follow follow = followRepository.findByFollowerAndFollowing(follower, following)
                .orElseThrow(() -> new IllegalArgumentException("팔로우 관계가 존재하지 않습니다."));

        followRepository.delete(follow);
    }

    public List<FollowDTO> getFollowingList(Member member) {
        return followRepository.findAllByFollower(member).stream()
                .map(m -> new FollowDTO(m.getFollowing()))
                .collect(Collectors.toList());
    }

    public List<FollowDTO> getFollowerList(Member member) {
        return followRepository.findAllByFollowing(member).stream()
                .map(m -> new FollowDTO(m.getFollower()))
                .collect(Collectors.toList());
    }

    public long countFollowers(Member member) {
        return followRepository.countByFollowing(member);
    }

    public long countFollowing(Member member) {
        return followRepository.countByFollower(member);
    }
}
