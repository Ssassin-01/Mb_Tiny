package com.meeti.mbTiny.service;

import com.meeti.mbTiny.dto.CommentDTO;
import com.meeti.mbTiny.dto.CommentsRequestDTO;
import com.meeti.mbTiny.entity.Comment;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Post;
import com.meeti.mbTiny.repository.CommentRepository;
import com.meeti.mbTiny.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final NotificationService notificationService;

    public void createComment(Long postId, CommentsRequestDTO dto, Member member, boolean isAnonymous) {
        Post post = validatePost(postId, isAnonymous);

        Comment comment = Comment.builder()
                .content(dto.getContent())
                .post(post)
                .member(member)
                .build();
        commentRepository.save(comment);
        if(!post.getMember().getId().equals(member.getId())) {
            notificationService.sendNotification(post.getMember().getId(), member.getNickname() + "님이 댓글을 남겼습니다.");
        }
    }
    public List<CommentDTO> getComment(Long postId, Member member, boolean isAnonymous) {
        Post post = validatePost(postId, isAnonymous);
        List<Comment> comments = commentRepository.findByPostOrderByCreatedAtDesc(post);

        return comments.stream().map(this::convertDTO).collect(Collectors.toList());
    }

    public void updateComment(Long postId, Long id, Member member, CommentsRequestDTO dto, boolean isAnonymous) {
        Post post = validatePost(postId, isAnonymous);
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글은 존재하지 않습니다."));
        validateCommentOwner(comment, post, member);
        comment.setContent(dto.getContent());
        commentRepository.save(comment);
    }

    public void deleteComment(Long postId, Long id, Member member, boolean isAnonymous) {
        Post post = validatePost(postId, isAnonymous);
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글은 존재하지 않습니다."));
        validateCommentOwner(comment, post, member);
        commentRepository.delete(comment);
    }

    private Post validatePost(Long postId, boolean isAnonymous) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));

        if (post.isAnonymous() != isAnonymous) {
            throw new IllegalArgumentException("게시물 익명 상태가 일치하지 않습니다.");
        }
        return post;
    }
    private void validateCommentOwner(Comment comment, Post post, Member member) {
        if (!comment.getPost().getId().equals(post.getId())) {
            throw new IllegalArgumentException("댓글이 해당 게시글에 속하지 않았습니다.");
        }
        if (!comment.getMember().getId().equals(member.getId())) {
            throw new IllegalArgumentException("댓글 수정/삭제 권한이 없습니다.");
        }
    }

    private CommentDTO convertDTO(Comment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .nickname(comment.getMember().getNickname())
                .mbti(comment.getMember().getMbti())
                .createdAt(comment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")))
                .build();
    }

}
