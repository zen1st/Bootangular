package com.sb.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatMessage {
	private String from;
	private String message;
	
	public String getFrom()
	{
		return this.from;
	}
	
	public String getMessage()
	{
		return this.message;
	}
}

