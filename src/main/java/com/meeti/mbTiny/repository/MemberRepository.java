package com.meeti.mbTiny.repository;

import com.meeti.mbTiny.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String nickname);

    Optional<Member> findByEmail(String email);
}
