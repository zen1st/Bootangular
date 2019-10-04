package com.sb.rest.chat;

import static java.lang.String.format;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import com.sb.dao.chat.ChatRoomDao;
import com.sb.dto.chat.ChatMessage;
import com.sb.dto.chat.ChatMessage.MessageType;
import com.sb.pojo.User;
import com.sb.pojo.chat.ChatRoom;

@Controller
public class ChatMessageCtrl {
	  //private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

	  @Autowired
	  private SimpMessageSendingOperations messagingTemplate;

	  @Autowired
      private ChatRoomDao chatRoomDao;
		
		
	  @MessageMapping("/chat/sendMessage/{roomId}")
	  public void sendMessage(@DestinationVariable Long roomId, @Payload ChatMessage chatMessage) {
		  
		  ChatRoom obj =  chatRoomDao.findById(chatMessage.getRoomId()).get();

		  if (chatRoomDao.findById(chatMessage.getRoomId()).isPresent() && obj.getMembers().contains(chatMessage.getUser())) {
			  
			  ChatMessage message = new ChatMessage();
			  message.setType(MessageType.CHAT);
			  message.setUser(chatMessage.getUser());
			  message.setRoomId(chatMessage.getRoomId());
			  message.setMessage(chatMessage.getMessage());

			  messagingTemplate.convertAndSend(format("/chat/%s", roomId), message);
		  }
	  }

	  /*
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
	    }
	    
	    headerAccessor.getSessionAttributes().put("username", chatMessage.getUser());
	    messagingTemplate.convertAndSend(format("/chat/%s", roomId), chatMessage);
	  }*/
}
