package com.sb.service.impl;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sb.dao.AuthorityRepository;
import com.sb.dao.UserRepository;
import com.sb.dto.UserDto;
import com.sb.dto.UserRequest;
import com.sb.exception.UserAlreadyExistException;
import com.sb.pojo.Authority;
import com.sb.pojo.User;
import com.sb.service.AuthorityService;
import com.sb.service.UserService;

/**
 * Created by fan.jin on 2016-10-15.
 */

@Service
public class UserServiceImpl implements UserService {
	
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private AuthorityRepository roleRepository;
  
  @Autowired
  private AuthorityService authService;

  @Override
  public User registerNewUserAccount(final UserDto accountDto) {
	  
	  /*
      if (emailExists(accountDto.getEmail())) {
          throw new UserAlreadyExistException("There is an account with that email adress: " + accountDto.getEmail());
      }
      */
      
      if (usernameExists(accountDto.getUsername())) {
          throw new UserAlreadyExistException("There is an account with that username: " + accountDto.getUsername());
      }
      
      
      final User user = new User();

      user.setUsername(accountDto.getUsername());
      user.setFirstName(accountDto.getFirstname());
      user.setLastName(accountDto.getLastname());
      user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
      user.setEnabled(true);
      
      //user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
      //user.setEmail(accountDto.getEmail());
      //user.setUsing2FA(accountDto.isUsing2FA());
      user.setAuthorities(Arrays.asList(roleRepository.findByName("ROLE_USER")));
      return userRepository.save(user);
  }
  
  public void resetCredentials() {
    List<User> users = userRepository.findAll();
    for (User user : users) {
      user.setPassword(passwordEncoder.encode("123"));
      userRepository.save(user);
    }
  }

  @Override
  // @PreAuthorize("hasRole('USER')")
  public User findByUsername(String username) throws UsernameNotFoundException {
    User u = userRepository.findByUsername(username);
    return u;
  }

  @PreAuthorize("hasRole('ADMIN')")
  public User findById(Long id) throws AccessDeniedException {
    User u = userRepository.findOne(id);
    return u;
  }

  @PreAuthorize("hasRole('ADMIN')")
  public List<User> findAll() throws AccessDeniedException {
    List<User> result = userRepository.findAll();
    return result;
  }

  @Override
  public User save(UserRequest userRequest) {
    User user = new User();
    user.setUsername(userRequest.getUsername());
    user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
    user.setFirstName(userRequest.getFirstname());
    user.setLastName(userRequest.getLastname());
    List<Authority> auth = authService.findByname("ROLE_USER");
    user.setAuthorities(auth);
    this.userRepository.save(user);
    return user;
  }

  private boolean usernameExists(final String username) {
      return userRepository.findByUsername(username) != null;
  }
  
  private boolean emailExists(final String email) {
      return userRepository.findByEmail(email) != null;
  }
}
