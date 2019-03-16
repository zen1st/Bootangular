package com.sb.dto;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.sb.validation.PasswordMatches;
import com.sb.validation.ValidEmail;
import com.sb.validation.ValidPassword;

//@PasswordMatches
public class UserDto {
	
    @NotNull
    @Size(min = 1, message = "{Size.userDto.username}")
    private String username;
    
    @NotNull
    @Size(min = 1, message = "{Size.userDto.firstname}")
    private String firstname;

    @NotNull
    @Size(min = 1, message = "{Size.userDto.lastname}")
    private String lastname;
    
    @ValidPassword
    private String password;

    //@NotNull
    //@Size(min = 1)
    //private String matchingPassword;

    /*
    @ValidEmail
    @NotNull
    @Size(min = 1, message = "{Size.userDto.email}")
    private String email;
	*/
    
    private boolean isUsing2FA;
    
    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }
    
    /*
    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }*/

    private Integer role;

    public Integer getRole() {
        return role;
    }

    public void setRole(final Integer role) {
        this.role = role;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(final String firstName) {
        this.firstname = firstName;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(final String lastName) {
        this.lastname = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    /*
    public String getMatchingPassword() {
        return matchingPassword;
    }

    public void setMatchingPassword(final String matchingPassword) {
        this.matchingPassword = matchingPassword;
    }*/

    public boolean isUsing2FA() {
        return isUsing2FA;
    }

    public void setUsing2FA(boolean isUsing2FA) {
        this.isUsing2FA = isUsing2FA;
    }

    @Override
    public String toString() {
        final StringBuilder builder = new StringBuilder();
        /*
        builder.append("UserDto [firstName=").append(firstName).append(", lastName=").append(lastName).append(", password=").append(password).append(", matchingPassword=").append(matchingPassword).append(", email=").append(email).append(", isUsing2FA=")
                .append(isUsing2FA).append(", role=").append(role).append("]");
        */
        
        builder.append("UserDto [username=").append(username).append(", firstName=").append(firstname).append(", lastName=").append(lastname).append(", password=").append(password).append(", isUsing2FA=")
        .append(isUsing2FA).append(", role=").append(role).append("]");
        
        return builder.toString();
    }

}
