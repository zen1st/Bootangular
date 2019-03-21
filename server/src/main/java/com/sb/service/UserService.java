package com.sb.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

import com.sb.dto.UserDto;
import com.sb.dto.UserRequest;
import com.sb.exception.UserAlreadyExistException;
import com.sb.pojo.PasswordResetToken;
import com.sb.pojo.User;
import com.sb.pojo.VerificationToken;

public interface UserService {
	
  //from Baeldung/spring-security-registration
  User registerNewUserAccount(UserDto accountDto) throws UserAlreadyExistException;

  User getUser(String verificationToken);

  void saveRegisteredUser(User user);

  void deleteUser(User user);

  void createVerificationTokenForUser(User user, String token);

  VerificationToken getVerificationToken(String VerificationToken);

  VerificationToken generateNewVerificationToken(String token);

  void createPasswordResetTokenForUser(User user, String token);

  User findUserByEmail(String email);

  PasswordResetToken getPasswordResetToken(String token);

  User getUserByPasswordResetToken(String token);

  Optional<User> getUserByID(long id);

  void changeUserPassword(User user, String password);

  boolean checkIfValidOldPassword(User user, String password);

  String validateVerificationToken(String token);

  String generateQRUrl(User user) throws UnsupportedEncodingException;

  User updateUser2FA(boolean use2FA);

  List<String> getUsersFromSessionRegistry();
	
  //from bfwg/angular-spring-starter
  void resetCredentials();

  User findById(Long id);

  User findByUsername(String username);

  List<User> findAll();

  User save(UserRequest user);


}
