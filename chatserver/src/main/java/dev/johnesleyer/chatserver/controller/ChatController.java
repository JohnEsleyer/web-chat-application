package dev.johnesleyer.chatserver.controller;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import dev.johnesleyer.chatserver.controller.model.Message;

@Controller
public class ChatController {
	
	
	@MessageMapping("/message") // /app/message
	@SendTo("/chatroom/public")
	private Message receivePublicMessage(@Payload Message message) {
		return message;
	}
}
