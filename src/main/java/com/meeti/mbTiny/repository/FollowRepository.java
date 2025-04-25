package com.meeti.mbTiny.repository;

import com.meeti.mbTiny.entity.Follow;
import com.meeti.mbTiny.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    boolean existsByFollowerAndFollowing(Member follower, Member following);
    Optional<Follow> findByFollowerAndFollowing(Member follower, Member following);
    List<Follow> findByFollower(Member member);
    List<Follow> findByFollowing(Member member);
}
