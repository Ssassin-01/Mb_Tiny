    package com.meeti.mbTiny.service;

    import com.meeti.mbTiny.dto.PostDTO;
    import com.meeti.mbTiny.dto.PostRequestDTO;
    import com.meeti.mbTiny.entity.Member;
    import com.meeti.mbTiny.entity.Post;
    import com.meeti.mbTiny.repository.LikeRepository;
    import com.meeti.mbTiny.repository.MemberRepository;
    import com.meeti.mbTiny.repository.PostRepository;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;

    import java.time.format.DateTimeFormatter;
    import java.util.List;
    import java.util.stream.Collectors;

    @Service
    @RequiredArgsConstructor
    public class PostService {
        private final PostRepository postRepository;
        private final MemberRepository memberRepository;
        private final LikeRepository likeRepository;
        public void createPost(PostRequestDTO dto, Member member) {
            Post post = Post.builder()
                    .title(dto.getTitle())
                    .content(dto.getContent())
                    .isAnonymous(dto.isAnonymous())
                    .viewCount(0L)
                    .member(member)
                    .build();
            postRepository.save(post);
        }

        public List<PostDTO> getAllPosts() {
            List<Post> posts = postRepository.findAll();
            return posts.stream()
                    .map(post -> {
                        String nickname = post.isAnonymous() ? "익명" : post.getMember().getNickname();
                        return PostDTO.builder()
                                .id(post.getId())
                                .title(post.getTitle())
                                .content(post.getContent())
                                .isAnonymous(post.isAnonymous())
                                .viewCount(post.getViewCount())
                                .nickname(nickname)
                                .createdAt(post.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                                .build();
                    }).collect(Collectors.toList());
        }

        public PostDTO getPost(Long id, String name) {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 피드입니다."));
            Member member = memberRepository.findByNickname(name)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

            post.setViewCount(post.getViewCount() + 1);
            postRepository.save(post);

            String nickname = post.isAnonymous() ? "익명" : post.getMember().getNickname();
            Long likeCount = likeRepository.countByPost(post);
            boolean liked = likeRepository.existsByPostAndMember(post, member);

            return PostDTO.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .nickname(nickname)
                    .isAnonymous(post.isAnonymous())
                    .viewCount(post.getViewCount())
                    .createdAt(post.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .liked(liked)
                    .likeCount(likeCount)
                    .build();
        }

        public void updatePost(Long id, Member member, PostRequestDTO dto) {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("없는 피드 입니다."));
            if(!post.getMember().getNickname().equals(member.getNickname())) {
                throw new IllegalArgumentException("자신의 글만 수정 가능");
            }

            post.setTitle(dto.getTitle());
            post.setContent(dto.getContent());
            post.setAnonymous(dto.isAnonymous());
            postRepository.save(post);
        }

        public void deletePost(Long id, Member member) {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("게시물이 존재하지 않습니다."));
            if(!post.getMember().getNickname().equals(member.getNickname())) {
                throw new IllegalArgumentException("자신의 글만 삭제 가능");
            }
            postRepository.delete(post);
        }
    }
