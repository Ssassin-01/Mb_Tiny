package com.meeti.mbTiny.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker   //웹소켓 + STOMP 프로토콜
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    //엔드포인트, 메세지 흐름 커마

    //STOMP 웹소켓에서 메세지를 주고받을 때 (목적지와 메세지를 구분한) 통신 규약
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        //서버->클라이언트
        config.enableSimpleBroker("/topic"); // 메시지를 구독하는 경로
        //클라이언트 -> 서버로 메세지 보내는 경로
        config.setApplicationDestinationPrefixes("/app"); // 클라이언트가 메시지를 보내는 경로

    }


    //서버와 연결 엔트포인트
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat") // 클라이언트가 연결할 엔드포인트
                .setAllowedOriginPatterns("*")
                .withSockJS(); // 웹소켓 지원이 안되면 SockJS로 대체
    }
}
