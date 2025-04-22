package com.meeti.mbTiny.repository;

import com.meeti.mbTiny.entity.Comment;
import com.meeti.mbTiny.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostOrderByCreatedAtDesc(Post post);
}
