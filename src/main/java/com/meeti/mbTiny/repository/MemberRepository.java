package com.meeti.mbTiny.repository;

import com.meeti.mbTiny.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);

    List<Member> findByNicknameContainingIgnoreCase(String keyword);
    Optional<Member> findByNicknameIgnoreCase(String nickname);
    @Query("SELECT m FROM Member m LEFT JOIN FETCH m.following WHERE m.id = :id")
    Optional<Member> findWithFollowingById(@Param("id") Long id);

}
