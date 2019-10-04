package com.sb.dto.chat;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.sb.pojo.chat.ChatTag;

public class ChatRoomDto {

    private Long id;
    
    private String name;
	
    private String createdBy;
    
    @NotNull
    @Size(min=1)
    private List<String> chatTags = new ArrayList<String>();

    private List<String> members = new ArrayList<String>();
    
    private List<String> pendingUsers = new ArrayList<String>();
    
    private List<String> blockedUsers = new ArrayList<String>();
    
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

	public List<String> getChatTags() {
		return chatTags;
	}

	public void setChatTags(List<String> chatTags) {
		this.chatTags = chatTags;
	}
	
    public List<String> getMembers() {
        return members;
    }

    public void setMembers(final List<String> members) {
        this.members = members;
    }
    
    public List<String> getPendingUsers() {
        return pendingUsers;
    }

    public void setPendingUsers(final List<String> pendingUsers) {
        this.pendingUsers = pendingUsers;
    }

	public List<String> getBlockedUsers() {
		return blockedUsers;
	}

	public void setBlockedUsers(List<String> blockedUsers) {
		this.blockedUsers = blockedUsers;
	}
	
	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

}
