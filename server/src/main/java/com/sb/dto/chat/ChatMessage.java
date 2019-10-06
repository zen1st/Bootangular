package com.sb.dto.chat;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sb.pojo.chat.ChatRoom;

public class ChatMessage {
	
	public enum MessageType {
		REQUEST, ACCEPT, BLOCK, CHAT, JOIN, LEAVE, EDIT, DELETE
	}

	private String user;
	private Long roomId;
	private ChatRoom chatRoom;
	private String message;
	private MessageType type;
	
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public void setRoomId(Long roomId)
	{
		this.roomId = roomId;
	}
	
	public Long getRoomId()
	{
		return this.roomId;
	}

	public void setMessage(String message)
	{
		this.message = message;
	}
	
	public String getMessage()
	{
		return this.message;
	}

	public MessageType getType() {
		return type;
	}

	public void setType(MessageType type) {
		this.type = type;
	}

	public ChatRoom getChatRoom() {
		return chatRoom;
	}

	public void setChatRoom(ChatRoom chatRoom) {
		this.chatRoom = chatRoom;
	}
}


