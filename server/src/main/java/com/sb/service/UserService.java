package com.sb.service;

import java.util.List;

import com.sb.dto.UserDto;
import com.sb.dto.UserRequest;
import com.sb.exception.UserAlreadyExistException;
import com.sb.pojo.User;

/**
 * Created by fan.jin on 2016-10-15.
 */
public interface UserService {
	
	User registerNewUserAccount(UserDto accountDto) throws UserAlreadyExistException;
	
	//User registerNewUserAccount(UserRequest accountDto);
	
  void resetCredentials();

  User findById(Long id);

  User findByUsername(String username);

  List<User> findAll();

  User save(UserRequest user);


}
