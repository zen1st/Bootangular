package com.sb.rest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import com.sb.dao.chat.ChatRoomDao;
import com.sb.dto.chat.ChatMessage;
import com.sb.dto.chat.ChatMessage.MessageType;
import com.sb.pojo.User;
import com.sb.pojo.chat.ChatRoom;

import static java.lang.String.format;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class WebSocketCtrl {

    private  SimpMessagingTemplate template;

    @Autowired
    void WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

	@Autowired
	private ChatRoomDao chatRoomDao;
	
	/*
	  @MessageMapping("/chat/sendMessage/{roomId}")
	  public void sendMessage(@DestinationVariable Long roomId, @Payload ChatMessage chatMessage) {
		  
		  User me = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	    
		  ChatRoom obj =  chatRoomDao.findById(chatMessage.getRoomId()).get();
		  
		  System.out.println("yes");
		  
		  if (chatRoomDao.findById(chatMessage.getRoomId()).isPresent() && obj.getMembers().contains(me.getUsername())) {
			  
			  System.out.println("no");
			  
			  ChatMessage message = new ChatMessage();
			  message.setType(MessageType.CHAT);
			  message.setUser(me.getUsername());
			  message.setRoomId(chatMessage.getRoomId());
			  message.setMessage(chatMessage.getMessage());

			  template.convertAndSend(format("/chat/%s", roomId), chatMessage);
		  }
	  }*/
	  
	  /*
    @MessageMapping("/send/message")
    public void onReceivedMesage(ChatMessage message){
    	
    	System.out.println(message);
    	
        this.template.convertAndSend("/chat",  new SimpleDateFormat("HH:mm:ss").format(new Date())+"- "
        + message.getUser()
        + " : "
        + message.getMessage());
    }*/
    
}
