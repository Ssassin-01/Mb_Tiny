package com.meeti.mbTiny.repository;

import com.meeti.mbTiny.entity.ChatRoom;
import com.meeti.mbTiny.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findBySenderOrReceiver(Member sender, Member receiver);
    @Query("""
    SELECT c FROM ChatRoom c
    LEFT JOIN FETCH c.messages
    WHERE (c.sender = :sender AND c.receiver = :receiver)
       OR (c.sender = :receiver AND c.receiver = :sender)
""")
    Optional<ChatRoom> findWithMessagesBySenderAndReceiverOrReceiverAndSender(
            @Param("sender") Member sender,
            @Param("receiver") Member receiver
    );
}
