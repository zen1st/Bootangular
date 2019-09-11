package com.sb.rest;

import static java.lang.String.format;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

//import com.example.springchat.controller.WebSocketEventListener;
import com.sb.dto.ChatMessage;
//import com.example.springchat.model.ChatMessage.MessageType;

@Controller
public class ChatCtrl {
	  //private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

	  @Autowired
	  private SimpMessageSendingOperations messagingTemplate;

	  @MessageMapping("/chat/{roomId}/sendMessage")
	  public void sendMessage(@DestinationVariable String roomId, @Payload ChatMessage chatMessage) {
	    messagingTemplate.convertAndSend(format("/chat/%s", roomId), chatMessage);
	  }

	  @MessageMapping("/chat/{roomId}/addUser")
	  public void addUser(@DestinationVariable String roomId, @Payload ChatMessage chatMessage,
	      SimpMessageHeaderAccessor headerAccessor) {
		  
	    String currentRoomId = (String) headerAccessor.getSessionAttributes().put("room_id", roomId);
	    
	    /*
	    if (currentRoomId != null) {
	      ChatMessage leaveMessage = new ChatMessage();
	      leaveMessage.setType(MessageType.LEAVE);
	      leaveMessage.setSender(chatMessage.getSender());
	      messagingTemplate.convertAndSend(format("/channel/%s", currentRoomId), leaveMessage);
	    }*/
	    
	    headerAccessor.getSessionAttributes().put("username", chatMessage.getBy());
	    messagingTemplate.convertAndSend(format("/chat/%s", roomId), chatMessage);
	  }
}
