package com.meeti.mbTiny.repository;

import com.meeti.mbTiny.entity.ChatRoom;
import com.meeti.mbTiny.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    Message findTopByChatRoomOrderBySentAtDesc(ChatRoom chatRoom);

    List<Message> findByChatRoomOrderBySentAtAsc(ChatRoom chatRoom);
}
