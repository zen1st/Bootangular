package com.sb.pojo.chat;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenerationTime;
import org.hibernate.annotations.GeneratorType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sb.pojo.User;
import com.sb.util.LoggedUserGenerator;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "chatRoom")
public class ChatRoom implements Serializable {
 	@Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
    
    /*@ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "chatRoom_chatTags",
      joinColumns = @JoinColumn(name = "chatRoom_id", 
      referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "chatTag_id", 
      referencedColumnName = "id"))
    private Set<ChatTag> chatTags = new HashSet<>();
    */
    
    /*
    @ManyToMany(mappedBy = "chatRooms")
    @JsonIgnoreProperties("chatRooms")
    private List<User> members;
    
    @ManyToMany(mappedBy = "chatRooms")
    @JsonIgnoreProperties("chatRooms")
    private List<User> pendingUsers;
    */
    
    @ElementCollection
    private List<String> chatTags = new ArrayList<String>();
    
    @ElementCollection(fetch=FetchType.EAGER)
    private List<String> members = new ArrayList<String>();
    
    @ElementCollection
    private List<String> pendingUsers = new ArrayList<String>();
    
    @ElementCollection
    private List<String> blockedUsers = new ArrayList<String>();
    
    @Column(name = "createdBy")
    @GeneratorType(
        type = LoggedUserGenerator.class,
        when = GenerationTime.INSERT
    )
    private String createdBy;
    
    @CreationTimestamp
    private Date createdAt;
    
    @Column(name = "updatedBy")
    @GeneratorType(
        type = LoggedUserGenerator.class,
        when = GenerationTime.ALWAYS
    )
    private String updatedBy;
    
    @UpdateTimestamp
    private Date updatedAt;

    public ChatRoom() {}
    
    public ChatRoom(String name) {
        this.name = name;
    }
    
    // Getters and Setters
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

    public void setBlockedUsers(final List<String> blockedUsers) {
        this.blockedUsers = blockedUsers;
    }
    
	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

}
