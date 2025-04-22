    package com.meeti.mbTiny.service;

    import com.meeti.mbTiny.dto.PostRequestDTO;
    import com.meeti.mbTiny.entity.Member;
    import com.meeti.mbTiny.entity.Post;
    import com.meeti.mbTiny.repository.PostRepository;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;

    @Service
    @RequiredArgsConstructor
    public class PostService {
        private final PostRepository postRepository;
        public void createPost(PostRequestDTO dto, Member member) {
            Post post = Post.builder()
                    .title(dto.getTitle())
                    .content(dto.getContent())
                    .isAnonymous(dto.isAnonymous())
                    .tags(dto.getTags())
                    .member(member)
                    .build();
            postRepository.save(post);
        }
    }
