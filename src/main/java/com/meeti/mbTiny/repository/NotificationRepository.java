package com.meeti.mbTiny.repository;

import com.meeti.mbTiny.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReceiverIdAndIsReadFalseOrderByCreateAtDesc(Long receiverId);
    List<Notification> findByReceiverIdAndIsReadFalse(Long receiverId);
}
