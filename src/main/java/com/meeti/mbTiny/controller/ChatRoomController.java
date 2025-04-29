package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.ChatRoomDTO;
import com.meeti.mbTiny.dto.ChatRoomRequestDTO;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.ChatRoomService;
import com.meeti.mbTiny.service.MemberService;
import com.meeti.mbTiny.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatrooms")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final MessageService messageService;

    @GetMapping
    public ResponseEntity<List<ChatRoomDTO>> getChatRooms(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Member member = userDetails.getMember();
        List<ChatRoomDTO> chatRooms = chatRoomService.getChatRoomsForMember(member);
        return ResponseEntity.ok(chatRooms);
    }
}
