package com.sb.pojo;

import java.io.Serializable;
import java.util.Collection;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.jboss.aerogear.security.otp.api.Base32;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "USER")
public class User implements UserDetails, Serializable {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty(access = Access.WRITE_ONLY)
    private Long id;
	
    private String username;
	
    /*
    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;
	*/
    
    private String email;

    @Column(length = 60)
    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;

    private boolean enabled;
    private boolean disabled;
    //private boolean isUsing2FA;

    @JsonProperty(access = Access.WRITE_ONLY)
    private String secret;

    //

	  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(name = "user_authority",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
	  @JsonIgnoreProperties("users")
  private Collection<Authority> authorities;
	  
	  
  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(name = "user_chatRoom",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "chatRoom_id", referencedColumnName = "id"))
	  @JsonIgnoreProperties("users")
  private Set<ChatRoom> chatRooms;

    public User() {
        super();
        this.secret = Base32.random();
        this.enabled = false;
        this.disabled = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }
	
    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }
	/*
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(final String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(final String lastName) {
        this.lastName = lastName;
    }
*/
    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public Collection<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(final Collection<Authority> authorities) {
        this.authorities = authorities;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(final boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(final boolean disabled) {
        this.disabled = disabled;
    }
    /*
    public boolean isUsing2FA() {
        return isUsing2FA;
    }

    public void setUsing2FA(boolean isUsing2FA) {
        this.isUsing2FA = isUsing2FA;
    }
	*/
    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }
    
    public Set<ChatRoom> getChatRooms() {
        return chatRooms;
    }

    public void setChatRooms(final Set<ChatRoom> chatRooms) {
        this.chatRooms = chatRooms;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = (prime * result) + ((email == null) ? 0 : email.hashCode());
        return result;
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final User user = (User) obj;
        if (!email.equals(user.email)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        final StringBuilder builder = new StringBuilder();
        /*
        builder.append("User [id=").append(id).append(", username=").append(username).append(", firstName=").append(firstName).append(", lastName=").append(lastName).append(", email=").append(email).append(", password=").append(password).append(", enabled=").append(enabled).append(", isUsing2FA=")
                .append(isUsing2FA).append(", secret=").append(secret).append(", authorities=").append(authorities).append("]");
        */
        //builder.append("User [id=").append(id).append(", username=").append(username).append(", firstName=").append(firstName).append(", lastName=").append(lastName).append(", email=").append(email).append(", password=").append(password).append(", enabled=").append(enabled).append(", secret=").append(secret).append(", authorities=").append(authorities).append("]");
        builder.append("User [id=").append(id).append(", username=").append(username).append(", email=").append(email).append(", password=").append(password).append(", enabled=").append(enabled).append(", disabled=").append(disabled).append(", secret=").append(secret).append(", authorities=").append(authorities).append("]");

        return builder.toString();
    }

    // We can add the below fields in the users table.
    // For now, they are hardcoded.
    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
      return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
      return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
      return true;
    }

}