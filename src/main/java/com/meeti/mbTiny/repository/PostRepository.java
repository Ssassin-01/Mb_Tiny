package com.meeti.mbTiny.repository;

import com.meeti.mbTiny.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByCreatedAtDesc();
    @Query("SELECT p FROM Post p LEFT JOIN p.likes l WHERE p.isAnonymous = false GROUP BY p ORDER BY COUNT(l) DESC, p.createdAt DESC")
    List<Post> findNonAnonymousPostsByLikeCountDesc();
    List<Post> findByIsAnonymousTrueOrderByCreatedAtDesc();
    List<Post> findByIsAnonymousFalseOrderByCreatedAtDesc();
    List<Post> findByMemberNicknameAndIsAnonymousFalseOrderByCreatedAtDesc(String nickname);
}