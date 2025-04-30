package com.meeti.mbTiny.repository;

import com.meeti.mbTiny.entity.ChatRoom;
import com.meeti.mbTiny.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findBySenderOrReceiver(Member sender, Member receiver);
    Optional<ChatRoom> findBySenderAndReceiverOrReceiverAndSender(Member s1, Member r1, Member s2, Member r2);
}
