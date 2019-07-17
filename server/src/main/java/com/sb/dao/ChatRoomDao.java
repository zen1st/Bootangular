package com.sb.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sb.pojo.ChatRoom;

@Repository
public interface ChatRoomDao extends JpaRepository<ChatRoom, Long> {

}