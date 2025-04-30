package com.meeti.mbTiny.service;

import com.meeti.mbTiny.dto.PostDTO;
import com.meeti.mbTiny.dto.PostRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Post;
import com.meeti.mbTiny.repository.LikeRepository;
import com.meeti.mbTiny.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnonymousPostService {
    private final PostRepository postRepository;
    private final LikeRepository likeRepository;
    private final FileUploadService fileUploadService;

    @Transactional
    public void createPost(PostRequestDTO dto, MultipartFile image, Member member) {
        String imageUrl = null;
        if(image != null && !image.isEmpty()) {
            imageUrl = fileUploadService.upload(image);
        }
        Post post = Post.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .isAnonymous(true)
                .viewCount(0L)
                .member(member)
                .imageUrl(imageUrl)
                .build();
        postRepository.save(post);
    }


    @Transactional
    public void updatePost(Long postId, Member member, PostRequestDTO dto, MultipartFile image) {
        Post post = validatePostOwner(member, postId);

        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setAnonymous(true);

        if (image != null) {
            if (!image.isEmpty()) {
                String imageUrl = fileUploadService.upload(image);
                post.setImageUrl(imageUrl);
            } else {
                post.setImageUrl(null);
            }
        }

        postRepository.save(post);
    }
    @Transactional
    public void deletePost(Member member, Long postId) {
        Post post = validatePostOwner(member, postId);
        postRepository.delete(post);
    }

    public List<PostDTO> getAllPosts(Optional<Member> member) {
        List<Post> posts = postRepository.findByIsAnonymousTrueOrderByCreatedAtDesc();
        return posts.stream()
                .map(post -> convertToDTO(post, member))
                .collect(Collectors.toList());
    }

    public PostDTO getPost(Member member, Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시물입니다."));
        if(!post.isAnonymous()) {
            throw new IllegalArgumentException("익명 게시물이 아닙니다");
        }
        post.setViewCount(post.getViewCount() + 1);
        postRepository.save(post);
        return convertToDTO(post, Optional.of(member));
    }

    private Post validatePostOwner(Member member, Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시물입니다."));
        if(!post.getMember().getEmail().equals(member.getEmail())) {
            throw new IllegalArgumentException("권한이 없습니다.");
        }
        if(!post.isAnonymous()) {
            throw new IllegalArgumentException("익명 게시물이 아닙니다");
        }
        return post;
    }
    private PostDTO convertToDTO(Post post, Optional<Member> member) {
        String nickName = post.isAnonymous() ? "익명" : post.getMember().getNickname();
        Long likeCount = likeRepository.countByPost(post);
        boolean liked = member
                .map(m -> likeRepository.existsByPostAndMember(post, m))
                .orElse(false);

        return PostDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .nickname(nickName)
                .imageUrl(post.getImageUrl())
                .email(post.getMember().getEmail())
                .isAnonymous(post.isAnonymous())
                .mbti(post.getMember().getMbti())
                .viewCount(post.getViewCount())
                .likeCount(likeCount)
                .liked(liked)
                .createdAt(post.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")))
                .build();
    }
}
