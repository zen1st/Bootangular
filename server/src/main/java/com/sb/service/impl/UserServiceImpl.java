package com.sb.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sb.dao.AuthorityRepository;
import com.sb.dao.UserRepository;
import com.sb.dao.VerificationTokenRepository;
import com.sb.dao.PasswordResetTokenRepository;
import com.sb.dto.UserDto;
import com.sb.dto.UserRequest;
import com.sb.exception.UserAlreadyExistException;
import com.sb.pojo.Authority;
import com.sb.pojo.PasswordResetToken;
import com.sb.pojo.User;
import com.sb.pojo.VerificationToken;
import com.sb.service.AuthorityService;
import com.sb.service.UserService;

@Service
public class UserServiceImpl implements UserService {

  //from Baeldung/spring-security-registration
	
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private VerificationTokenRepository tokenRepository;

  @Autowired
  private PasswordResetTokenRepository passwordTokenRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private AuthorityRepository roleRepository;
  
  @Autowired
  private AuthorityService authService;

  @Autowired
  private SessionRegistry sessionRegistry;
  
  public static final String TOKEN_INVALID = "invalidToken";
  public static final String TOKEN_EXPIRED = "expired";
  public static final String TOKEN_VALID = "valid";
  
  @Override
  public User registerNewUserAccount(final UserDto accountDto) {
	  
	  
      if (emailExists(accountDto.getEmail())) {
          throw new UserAlreadyExistException("There is an account with that email adress: " + accountDto.getEmail());
      }
      
      
      if (usernameExists(accountDto.getUsername())) {
          throw new UserAlreadyExistException("There is an account with that username: " + accountDto.getUsername());
      }
      
      
      final User user = new User();

      user.setUsername(accountDto.getUsername());
      //user.setFirstName(accountDto.getFirstname());
     //user.setLastName(accountDto.getLastname());
      user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
      
      //comment this out for email verification
      //user.setEnabled(true);
      
      user.setEmail(accountDto.getEmail());
      //user.setUsing2FA(accountDto.isUsing2FA());
      user.setAuthorities(Arrays.asList(roleRepository.findByName("ROLE_USER")));
      return userRepository.save(user);
  }
  
  
  @Override
  public User getUser(final String verificationToken) {
      final VerificationToken token = tokenRepository.findByToken(verificationToken);
      if (token != null) {
          return token.getUser();
      }
      return null;
  }

  @Override
  public VerificationToken getVerificationToken(final String VerificationToken) {
      return tokenRepository.findByToken(VerificationToken);
  }

  @Override
  public void saveRegisteredUser(final User user) {
      userRepository.save(user);
  }

  @Override
  public void deleteUser(final User user) {
      final VerificationToken verificationToken = tokenRepository.findByUser(user);

      if (verificationToken != null) {
          tokenRepository.delete(verificationToken);
      }

      final PasswordResetToken passwordToken = passwordTokenRepository.findByUser(user);

      if (passwordToken != null) {
          passwordTokenRepository.delete(passwordToken);
      }

      userRepository.delete(user);
  }
  
  @Override
  public void createVerificationTokenForUser(final User user, final String token) {
      final VerificationToken myToken = new VerificationToken(token, user);
      tokenRepository.save(myToken);
  }
  
  @Override
  public VerificationToken generateNewVerificationToken(final String existingVerificationToken) {
      VerificationToken vToken = tokenRepository.findByToken(existingVerificationToken);
      vToken.updateToken(UUID.randomUUID()
          .toString());
      vToken = tokenRepository.save(vToken);
      return vToken;
  }

  @Override
  public void createPasswordResetTokenForUser(final User user, final String token) {
      final PasswordResetToken myToken = new PasswordResetToken(token, user);
      passwordTokenRepository.save(myToken);
  }

  @Override
  public User findUserByEmail(final String email) {
      return userRepository.findByEmail(email);
  }

  @Override
  public PasswordResetToken getPasswordResetToken(final String token) {
      return passwordTokenRepository.findByToken(token);
  }

  @Override
  public User getUserByPasswordResetToken(final String token) {
      return passwordTokenRepository.findByToken(token)
          .getUser();
  }

  @Override
  public Optional<User> getUserByID(final long id) {
      return userRepository.findById(id);
  }

  @Override
  public void changeUserPassword(final User user, final String password) {
      user.setPassword(passwordEncoder.encode(password));
      userRepository.save(user);
  }

  @Override
  public boolean checkIfValidOldPassword(final User user, final String oldPassword) {
      return passwordEncoder.matches(oldPassword, user.getPassword());
  }

  @Override
  public String validateVerificationToken(String token) {
      final VerificationToken verificationToken = tokenRepository.findByToken(token);
      if (verificationToken == null) {
          return TOKEN_INVALID;
      }

      final User user = verificationToken.getUser();
      final Calendar cal = Calendar.getInstance();
      if ((verificationToken.getExpiryDate()
          .getTime()
          - cal.getTime()
              .getTime()) <= 0) {
          tokenRepository.delete(verificationToken);
          return TOKEN_EXPIRED;
      }

      user.setEnabled(true);
      // tokenRepository.delete(verificationToken);
      userRepository.save(user);
      return TOKEN_VALID;
  }

  /*
  @Override
  public String generateQRUrl(User user) throws UnsupportedEncodingException {
      return QR_PREFIX + URLEncoder.encode(String.format("otpauth://totp/%s:%s?secret=%s&issuer=%s", APP_NAME, user.getEmail(), user.getSecret(), APP_NAME), "UTF-8");
  }

  @Override
  public User updateUser2FA(boolean use2FA) {
      final Authentication curAuth = SecurityContextHolder.getContext()
          .getAuthentication();
      User currentUser = (User) curAuth.getPrincipal();
      currentUser.setUsing2FA(use2FA);
      currentUser = userRepository.save(currentUser);
      final Authentication auth = new UsernamePasswordAuthenticationToken(currentUser, currentUser.getPassword(), curAuth.getAuthorities());
      SecurityContextHolder.getContext()
          .setAuthentication(auth);
      return currentUser;
  }*/
  
  @Override
  public String generateQRUrl(User user) throws UnsupportedEncodingException {
  	// TODO Auto-generated method stub
  	return null;
  }

  @Override
  public User updateUser2FA(boolean use2fa) {
  	// TODO Auto-generated method stub
  	return null;
  }
  
  
  private boolean usernameExists(final String username) {
      return userRepository.findByUsername(username) != null;
  }
  
  private boolean emailExists(final String email) {
      return userRepository.findByEmail(email) != null;
  }
  
  @Override
  public List<String> getUsersFromSessionRegistry() {
      return sessionRegistry.getAllPrincipals()
          .stream()
          .filter((u) -> !sessionRegistry.getAllSessions(u, false)
              .isEmpty())
          .map(o -> {
              if (o instanceof User) {
                  return ((User) o).getEmail();
              } else {
                  return o.toString();
              }
          })
          .collect(Collectors.toList());

  }
  
  
  //from bfwg/angular-spring-starter
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
    User u = userRepository.getOne(id);
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
    //user.setFirstName(userRequest.getFirstname());
    //user.setLastName(userRequest.getLastname());
    List<Authority> auth = authService.findByname("ROLE_USER");
    user.setAuthorities(auth);
    this.userRepository.save(user);
    return user;
  }
}
