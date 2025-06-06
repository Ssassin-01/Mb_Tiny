package com.meeti.mbTiny.service;

import com.meeti.mbTiny.entity.Like;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Post;
import com.meeti.mbTiny.repository.LikeRepository;
import com.meeti.mbTiny.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;

    public boolean toggleLike(Long postId, Member member, boolean isAnonymous) {
        Post post = validatePost(postId, isAnonymous);
        Optional<Like> existingLike = likeRepository.findByMemberAndPost(member, post);
        if(existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
            return false;
        } else {
            Like like = Like.builder().member(member).post(post).build();
            likeRepository.save(like);
            return true;
        }
    }

    public Long getLikeCount(Long postId, boolean isAnonymous) {
        Post post = validatePost(postId, isAnonymous);
        return likeRepository.countByPost(post);

    }

    private Post validatePost(Long postId, boolean isAnonymous) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당피드는 존재하지 않습니다."));
        if (post.isAnonymous() != isAnonymous) {
            throw new IllegalArgumentException("게시물 익명 상태가 일치하지 않습니다.");
        }
        return post;
    }
}
