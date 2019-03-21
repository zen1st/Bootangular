package com.sb.security.auth;

public interface ISecurityUserService {

    String validatePasswordResetToken(long id, String token);

}
