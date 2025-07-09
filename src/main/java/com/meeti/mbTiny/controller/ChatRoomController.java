package com.meeti.mbTiny.controller;

import com.meeti.mbTiny.dto.ChatRoomDTO;
import com.meeti.mbTiny.dto.ChatRoomRequestDTO;
import com.meeti.mbTiny.dto.MessageDTO;
import com.meeti.mbTiny.entity.ChatRoom;
import com.meeti.mbTiny.entity.Member;
import com.meeti.mbTiny.security.CustomUserDetails;
import com.meeti.mbTiny.service.ChatRoomService;
import com.meeti.mbTiny.service.MemberService;
import com.meeti.mbTiny.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Clock;
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

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<MessageDTO>> getMessages(
            @PathVariable("roomId") Long roomId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Member member = userDetails.getMember();
        List<MessageDTO> messages = messageService.getMessagesForChatRoom(roomId, member);
        return ResponseEntity.ok(messages);
    }

    @PostMapping
    public ResponseEntity<ChatRoomDTO> createChatRoom(
            @RequestBody ChatRoomRequestDTO dto,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        System.out.println(dto.getReceiverNickname());
        Member sender = userDetails.getMember();
        ChatRoom chatRoom = chatRoomService.getOrCreateChatRoom(sender.getNickname(), dto.getReceiverNickname());

        return ResponseEntity.ok(chatRoomService.toDTO(chatRoom, sender));
    }
}
