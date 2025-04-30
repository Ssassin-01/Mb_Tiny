package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.entity.Notification;
import com.meeti.mbTiny.repository.NotificationRepository;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;
    private final NotificationRepository notificationRepository;

    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return notificationService.subscribe(userDetails.getMember().getId());
    }

    @GetMapping("/unread")
    public ResponseEntity<List<String>> getUnreadNotifications(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<String> unreadMessages = notificationService.getUnreadMessages(userDetails.getMember().getId());
        return ResponseEntity.ok(unreadMessages);
    }

    @PostMapping("/mark-as-read")
    public ResponseEntity<?> markNotificationsAsRead(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long memberId = userDetails.getMember().getId();
        List<Notification> notifications = notificationRepository.findByReceiverIdAndIsReadFalseOrderByCreateAtDesc(memberId);
        notifications.forEach(noti -> noti.setRead(true));
        notificationRepository.saveAll(notifications);
        return ResponseEntity.ok(Map.of("message", "읽음 처리 완료"));
    }



}