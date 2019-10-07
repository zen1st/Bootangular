package com.sb.rest.chat;

import static java.lang.String.format;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import com.sb.dao.chat.ChatRoomDao;
import com.sb.dto.chat.ChatMessage;
import com.sb.dto.chat.ChatMessage.MessageType;
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
			  message.setMessage("[" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) + "]  " + chatMessage.getMessage());

			  messagingTemplate.convertAndSend(format("/chat/%s", roomId), message);
		  }
	  }
}
