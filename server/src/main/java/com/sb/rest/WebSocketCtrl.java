package com.sb.rest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.sb.dto.ChatMessage;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class WebSocketCtrl {

    private  SimpMessagingTemplate template;

    @Autowired
    void WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message")
    public void onReceivedMesage(ChatMessage message){
    	
    	System.out.println(message);
    	
        this.template.convertAndSend("/chat",  new SimpleDateFormat("HH:mm:ss").format(new Date())+"- "
        + message.getFrom() 
        + " : "
        + message.getMessage());
    }
}
