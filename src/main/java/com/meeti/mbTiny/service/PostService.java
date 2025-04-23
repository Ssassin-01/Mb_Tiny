    package com.meeti.mbTiny.service;

    import com.meeti.mbTiny.dto.PostDTO;
    import com.meeti.mbTiny.dto.PostRequestDTO;
    import com.meeti.mbTiny.entity.Member;
    import com.meeti.mbTiny.entity.Post;
    import com.meeti.mbTiny.repository.LikeRepository;
    import com.meeti.mbTiny.repository.MemberRepository;
    import com.meeti.mbTiny.repository.PostRepository;
    import com.meeti.mbTiny.security.CustomUserDetails;
    import lombok.RequiredArgsConstructor;
    import org.springframework.security.core.annotation.AuthenticationPrincipal;
    import org.springframework.stereotype.Service;

    import java.time.format.DateTimeFormatter;
    import java.util.List;
    import java.util.Optional;
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

        public PostDTO getPost(Long id, String name) {
            Post post = postRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 피드입니다."));
            Member member = memberRepository.findByNickname(name)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

            post.setViewCount(post.getViewCount() + 1);
            postRepository.save(post);

            return convertToDTO(post, Optional.of(member));
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


        public List<PostDTO> getPostsByMBTI(String IorE, String NorS, String TorF, String JorP, Optional<Member> optionalMember) {
            List<Post> posts = postRepository.findAll();

            return posts.stream()
                    .filter(post -> {
                        String mbti = post.getMember().getMbti().toUpperCase();
                        return (IorE.equals("all") || mbti.startsWith(IorE)) &&
                                (NorS.equals("all") || mbti.charAt(1) == NorS.charAt(0)) &&
                                (TorF.equals("all") || mbti.charAt(2) == TorF.charAt(0)) &&
                                (JorP.equals("all") || mbti.charAt(3) == JorP.charAt(0));
                    }).map(post -> convertToDTO(post, optionalMember))
                    .collect(Collectors.toList());
        }

        public List<PostDTO> getPostsByLikeCount(Optional<Member> optionalMember) {
            List<Post> posts = postRepository.findAllByOrderByLikeCountDesc();

            return posts.stream()
                    .map(post -> convertToDTO(post, optionalMember))
                    .collect(Collectors.toList());
        }

        public List<PostDTO> getPostsByAnonymous(boolean isAnonymous, Optional<Member> optionalMember) {
            List<Post> posts = postRepository.findByIsAnonymousOrderByCreatedAtDesc(isAnonymous);
            return posts.stream()
                    .map(post -> convertToDTO(post, optionalMember))
                    .collect(Collectors.toList());
        }
        private PostDTO convertToDTO(Post post, Optional<Member> optionalMember) {
            String nickname = post.isAnonymous() ? "익명" : post.getMember().getNickname();
            Long likeCount = likeRepository.countByPost(post);
            boolean liked = optionalMember.isPresent() &&
                    likeRepository.existsByPostAndMember(post, optionalMember.get());

            return PostDTO.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .nickname(nickname)
                    .isAnonymous(post.isAnonymous())
                    .viewCount(post.getViewCount())
                    .likeCount(likeCount)
                    .liked(liked)
                    .createdAt(post.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                    .build();
        }
    }
