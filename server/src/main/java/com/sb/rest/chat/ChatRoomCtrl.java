package com.sb.rest.chat;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sb.dao.chat.ChatRoomDao;
import com.sb.dao.chat.ChatTagDao;
import com.sb.dto.chat.ChatMessage;
import com.sb.dto.chat.ChatMessage.MessageType;
import com.sb.dto.chat.ChatRoomDto;
import com.sb.pojo.User;
import com.sb.pojo.chat.ChatRoom;
import com.sb.pojo.chat.ChatTag;
import com.sb.security.registration.OnRegistrationCompleteEvent;

@RestController
@RequestMapping("/api/chatRooms")
public class ChatRoomCtrl {
	
	@Autowired
    private ChatRoomDao chatRoomDao;
	
	@Autowired
    private ChatTagDao chatTagDao;
	
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    
	private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
	 
	@GetMapping
    @PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<ChatRoom>> findAll() {
		return ResponseEntity.ok(chatRoomDao.findAll());
	}
  
	@GetMapping("/{id}")
	public ResponseEntity<ChatRoom> findById(@PathVariable Long id) {
      Optional<ChatRoom> obj = chatRoomDao.findById(id);
      if (!obj.isPresent()) {
          //log.error("Id " + id + " is not existed");
    	  ResponseEntity.badRequest().build();
      }

      	return ResponseEntity.ok(obj.get());
	}

	@PostMapping
	public ResponseEntity create(@Valid @RequestBody ChatRoomDto chatRoomDto) {
	
		User me = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		  
		ChatRoom obj  = new ChatRoom(chatRoomDto.getName());
		obj.setChatTags(chatRoomDto.getChatTags());
		
		List<String> members = new ArrayList<String>();
		members.add(me.getUsername());
		obj.setMembers(members);
		
	    return ResponseEntity.ok(chatRoomDao.save(obj));
	
		//return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
	}
    
    @PutMapping("/{id}")
    public ResponseEntity<ChatRoom> update(@PathVariable Long id, @Valid @RequestBody ChatRoomDto chatRoomDto) {

		User me = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	
        if (!chatRoomDao.findById(id).isPresent()) {
            //log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }
        
    	ChatRoom obj =  chatRoomDao.findById(id).get();

        if(!me.getUsername().equals(obj.getCreatedBy())){
        	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        
    	obj.setName(chatRoomDto.getName());
    	obj.setChatTags(chatRoomDto.getChatTags());
		
	    ChatMessage message = new ChatMessage();
	    message.setType(MessageType.EDIT);
	    message.setUser(me.getUsername());
	    message.setRoomId(obj.getId());
	    message.setMessage("Chatroom '"+obj.getName()+"' have been edited.");
	    obj.setPendingUsers(null);
	    obj.setBlockedUsers(null);
	    message.setChatRoom(obj);
	    
    	this.simpMessagingTemplate.convertAndSend("/chat/"+obj.getId(), message);
    	
        return ResponseEntity.ok(chatRoomDao.save(obj));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
    	
		User me = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
        if (!chatRoomDao.findById(id).isPresent()) {
            //log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

        ChatRoom obj =  chatRoomDao.findById(id).get();
        
        if(!me.getUsername().equals(obj.getCreatedBy())){
        	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        		
        chatRoomDao.deleteById(id);
        
	    ChatMessage message = new ChatMessage();
	    message.setType(MessageType.DELETE);
	    message.setUser(me.getUsername());
	    message.setRoomId(id);
	    message.setMessage("Chatroom '"+obj.getName()+"' have been deleted.");
    	this.simpMessagingTemplate.convertAndSend("/chat/"+id, message);
    	
        return ResponseEntity.ok().build();
    }
    
    /*@Bean
    public ConfigurableServletWebServerFactory webServerFactory() {
        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
        factory.addConnectorCustomizers(new TomcatConnectorCustomizer() {
            @Override
            public void customize(Connector connector) {
                connector.setProperty("relaxedQueryChars", "|{}[]");
            }
        });
        return factory;
    }*/
    
    @PostMapping("/search")
    ResponseEntity<List<ChatRoomDto>> search(@RequestBody ChatRoomDto chatRoomDto ) { 

  	  User me = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  	  
  	  List<ChatRoomDto> chatRoomDtoList = new ArrayList<ChatRoomDto>();

  	  
  	  chatRoomDao.findDistinctByChatTagsIn(chatRoomDto.getChatTags()).forEach((chatRoom)->{ 
  		  
  		  	if(!chatRoom.getMembers().contains(me.getUsername()) &&
  		  		!chatRoom.getPendingUsers().contains(me.getUsername()) &&
  		  		!chatRoom.getBlockedUsers().contains(me.getUsername())){
  		  		
	  		  	ChatRoomDto obj = new ChatRoomDto();
	  		  
				obj.setId(chatRoom.getId());
				obj.setName(chatRoom.getName());
				obj.setChatTags(chatRoom.getChatTags());
				//obj.setMembers(chatRoom.getMembers());
				obj.setCreatedBy(chatRoom.getCreatedBy());

				chatRoomDtoList.add(obj);
  		  	}
  	  });
  	  
  	  if(chatRoomDtoList.size()==0)
  	  {
  		ResponseEntity.badRequest().build();
  	  }
  	  
  	  return ResponseEntity.ok(chatRoomDtoList);
  	
    }
    
    @RequestMapping("/mine")
    public List<ChatRoomDto> myChatRoom() {

  	  User me = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  	  
  	  List<ChatRoomDto> chatRoomDtoList = new ArrayList<ChatRoomDto>();
  	  
  	  chatRoomDao.findByMembers(me.getUsername()).forEach((chatRoom)->{ 
  		  
  		  ChatRoomDto chatRoomDto = new ChatRoomDto();
  		  
  		  chatRoomDto.setId(chatRoom.getId());
  		  chatRoomDto.setName(chatRoom.getName());
  		  chatRoomDto.setChatTags(chatRoom.getChatTags());
  		  chatRoomDto.setMembers(chatRoom.getMembers());
  		  chatRoomDto.setCreatedBy(chatRoom.getCreatedBy());
  		  
  		  if(chatRoom.getCreatedBy()==me.getUsername()) {
  			  chatRoomDto.setPendingUsers(chatRoom.getPendingUsers());
  			  chatRoomDto.setBlockedUsers(chatRoom.getBlockedUsers());
  		  }  
  		  
  		  chatRoomDtoList.add(chatRoomDto);
  		 
  	  });
  	  //chatRoomDao.findByCreatedBy(user.getUsername());
  	  return chatRoomDtoList;
    }
    
    @PostMapping("/request")
    public ResponseEntity<?> request(@RequestBody ChatRoomDto chatRoomDto) {
    	
    	User me = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	
        if (!chatRoomDao.findById(chatRoomDto.getId()).isPresent()) {
            //log.error("Id " + id + " is not existed");
            return ResponseEntity.badRequest().build();
        }

    	ChatRoom obj =  chatRoomDao.findById(chatRoomDto.getId()).get();
    	
    	if(obj.getPendingUsers().contains(me.getUsername())) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You have already requested.");
    	}
    	
    	if(obj.getMembers().contains(me.getUsername())) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You are already a member.");
    	}
    	
    	if(obj.getBlockedUsers().contains(me.getUsername())) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You are blocked.");
    	}
    	
    	List<String> pendingUsers = obj.getPendingUsers();
    	
    	pendingUsers.add(me.getUsername());
    	
    	obj.setPendingUsers(pendingUsers);

    	obj = chatRoomDao.save(obj);

	    ChatMessage message = new ChatMessage();
	    message.setType(MessageType.REQUEST);
	    message.setUser(me.getUsername());
	    message.setRoomId(chatRoomDto.getId());
	    message.setMessage(me.getUsername() + " requested to join chatroom '" + obj.getName()+"'.");
	      
    	this.simpMessagingTemplate.convertAndSend("/notification/"+obj.getCreatedBy(), message);
    	
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/accept")
    public ResponseEntity<?> accept(@RequestBody ChatMessage chatMessage) {
    	
    	User me = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	
        if (!chatRoomDao.findById(chatMessage.getRoomId()).isPresent() ) {
            //log.error("Id " + id + " is not existed");
            return ResponseEntity.badRequest().build();
        }

    	ChatRoom obj = chatRoomDao.findById(chatMessage.getRoomId()).get();
    	
        if(!obj.getCreatedBy().equals(me.getUsername())){
        	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        
        if(!obj.getPendingUsers().contains(chatMessage.getUser())){
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not a pending user.");
        }
        
    	List<String> pendingUsers = obj.getPendingUsers();
    	List<String> members = obj.getMembers();
    	
    	pendingUsers.remove(chatMessage.getUser());
    	obj.setPendingUsers(pendingUsers);
    	
    	members.add(chatMessage.getUser());
    	obj.setMembers(members);
    	
    	obj = chatRoomDao.save(obj);
    	
	    ChatMessage message = new ChatMessage();
	    message.setType(MessageType.ACCEPT);
	    message.setUser(chatMessage.getUser());
	    message.setRoomId(chatMessage.getRoomId());
    	this.simpMessagingTemplate.convertAndSend("/chat/"+obj.getId(), message);
    	
	    message.setMessage("You've been accepted to chatroom '" + obj.getName()+"'.");
	    obj.setPendingUsers(null);
	    obj.setBlockedUsers(null);
	    message.setChatRoom(obj);
    	this.simpMessagingTemplate.convertAndSend("/notification/"+chatMessage.getUser(), message);

        return ResponseEntity.ok().build();
    }
   
    @PostMapping("/block")
    public ResponseEntity<?> block(@RequestBody ChatMessage chatMessage) {
    	
    	User me = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	
        if (!chatRoomDao.findById(chatMessage.getRoomId()).isPresent()) {
            //log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

    	ChatRoom obj =  chatRoomDao.findById(chatMessage.getRoomId()).get();
    	
        if(!obj.getCreatedBy().equals(me.getUsername())){
        	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        
        if(!obj.getPendingUsers().contains(chatMessage.getUser()) && !obj.getMembers().contains(chatMessage.getUser())){
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not in chat.");
        }

    	List<String> pendingUsers = obj.getPendingUsers();
    	List<String> members = obj.getMembers();
    	List<String> blockedUsers = obj.getBlockedUsers();
    	
    	pendingUsers.remove(chatMessage.getUser());
    	obj.setPendingUsers(pendingUsers);
    	
    	members.remove(chatMessage.getUser());
    	obj.setMembers(members);
    	
    	blockedUsers.add(chatMessage.getUser());
    	obj.setMembers(members);
    	
    	obj = chatRoomDao.save(obj);
    	
	    ChatMessage message = new ChatMessage();
	    message.setType(MessageType.BLOCK);
	    message.setUser(chatMessage.getUser());
	    message.setRoomId(chatMessage.getRoomId());

	    message.setMessage("You've been blocked from chatroom '" + obj.getName() +"'.");
    	this.simpMessagingTemplate.convertAndSend("/chat/"+obj.getId(), message);
	    
    	//this.simpMessagingTemplate.convertAndSend("/notification/"+chatMessage.getUser(), message);
    	
    	return ResponseEntity.ok().build();
    }

    @PostMapping("/unblock")
    public ResponseEntity<?> unblock(@RequestBody ChatMessage chatMessage) {
    	
    	User me = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	
        if (!chatRoomDao.findById(chatMessage.getRoomId()).isPresent()) {
            //log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

    	ChatRoom obj =  chatRoomDao.findById(chatMessage.getRoomId()).get();

        if(!obj.getCreatedBy().equals(me.getUsername())){
        	return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        
        if(!obj.getBlockedUsers().contains(chatMessage.getUser())){
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not blocked.");
        }
        
    	List<String> blockedUsers = obj.getBlockedUsers();
    	List<String> members = obj.getMembers();
    	
    	blockedUsers.remove(chatMessage.getUser());
    	obj.setMembers(members);
    	
    	members.add(chatMessage.getUser());
    	obj.setMembers(members);
    	obj = chatRoomDao.save(obj);
    	
	    ChatMessage message = new ChatMessage();
	    message.setType(MessageType.ACCEPT);
	    message.setUser(chatMessage.getUser());
	    message.setRoomId(chatMessage.getRoomId());
    	this.simpMessagingTemplate.convertAndSend("/chat/"+obj.getId(), message);
    	
	    message.setMessage("You've been accepted to chat '" + obj.getName() + "'.");
	    obj.setPendingUsers(null);
	    obj.setBlockedUsers(null);
	    message.setChatRoom(obj);
    	this.simpMessagingTemplate.convertAndSend("/notification/"+chatMessage.getUser(), message);
    	
    	return ResponseEntity.ok().build();
    }
    
    @PostMapping("/leave")
    public ResponseEntity<?> leave(@RequestBody ChatMessage chatMessage) {
    	
    	User me = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    	
        if (!chatRoomDao.findById(chatMessage.getRoomId()).isPresent()) {
            //log.error("Id " + id + " is not existed");
            ResponseEntity.badRequest().build();
        }

    	ChatRoom obj =  chatRoomDao.findById(chatMessage.getRoomId()).get();
    	
        if(!obj.getMembers().contains(me.getUsername())){
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You are not a member.");
        }
        
    	List<String> members = obj.getMembers();
    	members.remove(me.getUsername());
    	obj.setMembers(members);
    	obj = chatRoomDao.save(obj);

	    ChatMessage message = new ChatMessage();
	    message.setType(MessageType.LEAVE);
	    message.setUser(me.getUsername());
	    message.setRoomId(obj.getId());
	    message.setMessage(me.getUsername() + " left " + obj.getName());
	      
    	this.simpMessagingTemplate.convertAndSend("/chat/"+obj.getId(), message);
    	
        return ResponseEntity.ok().build();
    }
}