package com.sb.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.sb.validation.PasswordMatches;
import com.sb.validation.ValidPassword;

@PasswordMatches
public class PasswordDto {

    private String oldPassword;

    //@ValidPassword
    private String password;
    
    @NotNull
    @Size(min = 1)
    private String matchingPassword;

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public String getMatchingPassword() {
        return matchingPassword;
    }

    public void setMatchingPassword(final String matchingPassword) {
        this.matchingPassword = matchingPassword;
    }
}
