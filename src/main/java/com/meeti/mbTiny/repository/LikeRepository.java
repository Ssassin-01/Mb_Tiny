package com.meeti.mbTiny.repository;

import com.meeti.mbTiny.entity.Like;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByMemberAndPost(Member member, Post post);

    Long countByPost(Post post);

    boolean existsByPostAndMember(Post post, Member member);
}
