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

    public void createComment(Long postId, CommentsRequestDTO dto, Member member) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다."));
        Comment comment = Comment.builder()
                .content(dto.getContent())
                .post(post)
                .member(member)
                .build();
        commentRepository.save(comment);
    }
    public List<CommentDTO> getComment(Long postId, Member member) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 피드는 존재하지 않습니다."));
        List<Comment> comments = commentRepository.findByPostOrderByCreatedAtDesc(post);

        return comments.stream().map(comment ->
                CommentDTO.builder()
                        .id(comment.getId())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH-mm")))
                        .build()
                ).collect(Collectors.toList());
    }

    public void updateComment(Long postId, Long id, Member member, CommentsRequestDTO dto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 피드는 존재하지 않습니다."));
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글은 존재하지 않습니다."));
        if(!comment.getPost().getId().equals(post.getId())) {
            throw new IllegalArgumentException("댓글이 해당 게시글에 속하지 않았습니다.");
        }
        if(!comment.getMember().getNickname().equals(member.getNickname())) {
            throw new IllegalArgumentException("댓글 수정권한이 없습니다.");
        }
        comment.setContent(dto.getContent());
        commentRepository.save(comment);
    }

    public void deleteComment(Long postId, Long id, Member member) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("해당 피드는 존재하지 않습니다."));
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 댓글은 존재하지 않습니다."));
        if(!comment.getPost().getId().equals(post.getId())) {
            throw new IllegalArgumentException("댓글이 해당 게시글에 없습니다.");
        }
        if(!comment.getMember().getNickname().equals(member.getNickname())) {
            throw new IllegalArgumentException("댓글 삭제 권한이 없습니다.");
        }
        commentRepository.delete(comment);
    }
}
