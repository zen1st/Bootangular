package com.sb.dao.chat;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sb.pojo.chat.ChatTag;

public interface ChatTagDao extends JpaRepository<ChatTag, Long> {
	
}
