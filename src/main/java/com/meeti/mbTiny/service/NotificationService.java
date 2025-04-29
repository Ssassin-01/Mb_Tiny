package com.meeti.mbTiny.service;

import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.entity.Notification;
import com.meeti.mbTiny.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final Map<Long, ScheduledFuture<?>> heartbeatFutures = new ConcurrentHashMap<>();
    private final NotificationRepository notificationRepository;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public SseEmitter subscribe(Long memberId) {
        System.out.println("✅ 구독 시작 memberId: " + memberId);
        SseEmitter emitter = new SseEmitter(60 * 60 * 1000L);

        removeEmitter(memberId);
        emitters.put(memberId, emitter);

        emitter.onCompletion(() -> removeEmitter(memberId));
        emitter.onTimeout(() -> removeEmitter(memberId));
        emitter.onError(e -> removeEmitter(memberId));

        try {
            // ✅ 최초 연결 직후 더미 데이터라도 하나 보내야 끊어지지 않음
            emitter.send(SseEmitter.event().name("connect").data("Connected"));
        } catch (IOException e) {
            throw new RuntimeException("SSE 연결 오류", e);
        }

        ScheduledFuture<?> future = startHeartbeat(memberId);
        heartbeatFutures.put(memberId, future);

        return emitter;
    }

    private ScheduledFuture<?> startHeartbeat(Long memberId) {
        return scheduler.scheduleAtFixedRate(() -> {
            if (emitters.containsKey(memberId)) {
                try {
                    emitters.get(memberId).send(SseEmitter.event().name("heartbeat").data("heartbeat"));
                } catch (IOException e) {
                    System.out.println("Heartbeat 실패, emitter 제거: memberId = " + memberId);
                    removeEmitter(memberId);
                }
            }
        }, 0, 30, TimeUnit.SECONDS);
    }

    private void removeEmitter(Long memberId) {
        SseEmitter emitter = emitters.remove(memberId);
        if (emitter != null) {
            emitter.complete();
        }
        ScheduledFuture<?> future = heartbeatFutures.remove(memberId);
        if (future != null) {
            future.cancel(true);
        }
        System.out.println("🧹 emitter & heartbeat clean 완료: memberId = " + memberId);
    }


    public void sendNotification(Long receiverId, String message) {
        Notification notification = Notification.builder()
                .receiver(Member.builder().id(receiverId).build())
                .message(message)
                .isRead(false)
                .build();
        notificationRepository.save(notification);

        SseEmitter emitter = emitters.get(receiverId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().name("notification").data(message));
            } catch (IOException e) {
                System.out.println("💥 알림 전송 실패, emitter 제거: memberId = " + receiverId);
                removeEmitter(receiverId);
            }
        }
    }

    public List<String> getUnreadMessages(Long memberId) {
        return notificationRepository.findByReceiverIdAndIsReadFalse(memberId)
                .stream()
                .map(Notification::getMessage)
                .collect(Collectors.toList());
    }

}