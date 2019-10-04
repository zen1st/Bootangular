package com.sb.dto.chat;

import java.util.HashSet;
import java.util.Set;

import com.sb.pojo.chat.ChatRoom;

public class ChatTagDto {

    private Long id;
    
    private String name;

	// constructors, getters, setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}