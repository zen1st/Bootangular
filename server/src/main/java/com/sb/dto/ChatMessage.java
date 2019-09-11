package com.sb.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatMessage {
	
	public enum MessageType {
		CHAT, JOIN, LEAVE
	}

	private MessageType type;
	private String by;
	private Long roomId;
	private String message;
	  
	public void setBy(String by)
	{
		this.by = by;
	}
	
	public String getBy()
	{
		return this.by;
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
}

