package com.sb.dao.chat;

import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sb.dto.chat.ChatRoomDto;
import com.sb.pojo.User;
import com.sb.pojo.chat.ChatRoom;
import com.sb.pojo.chat.ChatTag;

@Repository
public interface ChatRoomDao extends JpaRepository<ChatRoom, Long> {
	
	List<ChatRoom> findByCreatedBy(String name);
	
	List<ChatRoom> findByMembers(String user);
	
	List<ChatRoom> findByChatTags(String name);
	
	//In order to find chat rooms that are tagged with either of those tags, you can use the following query method
	//List<ChatRoom> findByChatTagsIn(Set<String> chatTag);
	List<ChatRoom> findByChatTagsIn(List<String> chatTag);
	
	//In order to get rid of those repeated chat rooms, you can fetch only distinct values
	//List<ChatRoom> findDistinctByChatTagsIn(Set<ChatTag> chatTag);
	List<ChatRoom> findDistinctByChatTagsIn(List<String> list);
}