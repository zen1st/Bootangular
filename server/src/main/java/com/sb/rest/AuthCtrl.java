package com.sb.rest;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.sb.dto.PasswordDto;
import com.sb.dto.UserDto;
import com.sb.exception.InvalidOldPasswordException;
import com.sb.pojo.User;
import com.sb.pojo.UserTokenState;
import com.sb.pojo.VerificationToken;
import com.sb.security.TokenHelper;
import com.sb.security.auth.ISecurityUserService;
import com.sb.security.registration.OnRegistrationCompleteEvent;
import com.sb.service.UserService;
import com.sb.service.impl.CustomUserDetailsService;
import com.sb.util.GenericResponse;
import com.sb.validation.ValidPassword;

@RestController
@RequestMapping(value = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthCtrl {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserService userService;

    @Autowired
    private ISecurityUserService securityUserService;
    
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private MessageSource messages;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    private Environment env;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    TokenHelper tokenHelper;

    @Value("${jwt.expires_in}")
    private int EXPIRES_IN;

    @Value("${jwt.cookie}")
    private String TOKEN_COOKIE;
    
    public AuthCtrl() {
        super();
    }

    // Registration

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @ResponseBody
    public GenericResponse registerUserAccount(@Valid @RequestBody final UserDto accountDto, final HttpServletRequest request) {
        LOGGER.debug("Registering user account with information: {}", accountDto);
        final User registered = userService.registerNewUserAccount(accountDto);
        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered, request.getLocale(), getAppUrl(request)));
       return new GenericResponse("success");
    }
    
    
    @RequestMapping(value = "/verifyEmail", method = RequestMethod.GET)
    public ModelAndView confirmRegistration(final HttpServletRequest request, final Model model, @RequestParam("token") final String token) throws UnsupportedEncodingException {
    	
        Locale locale = request.getLocale();
        
        final String result = userService.validateVerificationToken(token);
        if (result.equals("valid")) {
            final User user = userService.getUser(token);
            // if (user.isUsing2FA()) {
            // model.addAttribute("qr", userService.generateQRUrl(user));
            // return "redirect:/qrcode.html?lang=" + locale.getLanguage();
            // }
            authWithoutPassword(user);
            //model.addAttribute("message", messages.getMessage("message.accountVerified", null, locale));
            //return "redirect:/?lang=" + locale.getLanguage();
            
            ModelAndView modelAndView = new ModelAndView("redirect:" + getAppUrl(request) + "/");
            modelAndView.addObject("message", messages.getMessage("message.accountVerified", null, locale));
            return modelAndView;
        }

        //model.addAttribute("message", messages.getMessage("auth.message." + result, null, locale));
        //model.addAttribute("expired", "expired".equals(result));
        //model.addAttribute("token", token);
        //return "redirect:/badUser?lang=" + locale.getLanguage();

        ModelAndView modelAndView = new ModelAndView("redirect:" + getAppUrl(request) + "/badToken");
        modelAndView.addObject("message", messages.getMessage("auth.message." + result, null, locale));
        modelAndView.addObject("expired", "expired".equals(result));
        modelAndView.addObject("token", token);
        return modelAndView;
    }

    // user activation - verification
    
    @RequestMapping(value = "/resendEmailVerification", method = RequestMethod.GET)
    @ResponseBody
    public GenericResponse resendRegistrationToken(final HttpServletRequest request, @RequestParam("token") final String existingToken) {
    	
    	
        final VerificationToken newToken = userService.generateNewVerificationToken(existingToken);
        final User user = userService.getUser(newToken.getToken());
        mailSender.send(constructResendVerificationTokenEmail(getAppUrl(request), request.getLocale(), newToken, user));
        
        return new GenericResponse(messages.getMessage("message.resendToken", null, request.getLocale()));
    }
    
    // Refresh Auth Token
    @RequestMapping(value = "/refreshAuthToken", method = RequestMethod.GET)
    public ResponseEntity<?> refreshAuthenticationToken(final HttpServletRequest request, HttpServletResponse response) {

        String authToken = tokenHelper.getToken( request );
        if (authToken != null) {// && tokenHelper.canTokenBeRefreshed(authToken)) {
            // TODO check user password last update
            String refreshedToken = tokenHelper.refreshToken(authToken);

            Cookie authCookie = new Cookie( TOKEN_COOKIE, ( refreshedToken ) );
            authCookie.setPath( "/" );
            authCookie.setHttpOnly( true );
            authCookie.setMaxAge( EXPIRES_IN );
            // Add cookie to response
            response.addCookie( authCookie );

            UserTokenState userTokenState = new UserTokenState(refreshedToken, EXPIRES_IN);
            
            return ResponseEntity.ok(userTokenState);
        } else {
            UserTokenState userTokenState = new UserTokenState();
          
           return ResponseEntity.accepted().body(userTokenState);
        }
    }
    

    // Reset password

    @RequestMapping(value = "/resetPassword", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> resetPassword(final HttpServletRequest request, @RequestParam("email") final String userEmail) {
    	
        final User user = userService.findUserByEmail(userEmail);
        if (user != null) {
            final String token = UUID.randomUUID().toString();
            userService.createPasswordResetTokenForUser(user, token);
            mailSender.send(constructResetTokenEmail(getAppUrl(request), request.getLocale(), token, user));
            
	        //Map<String, String> result = new HashMap<>();
	        //result.put( "message", "message.resetPasswordEmail");
	        return ResponseEntity.accepted().body(new GenericResponse(messages.getMessage("message.resetPasswordEmail", null, request.getLocale())));
        }
        
    	Map<String, String> result = new HashMap<>();
        result.put( "message", "User do not exist." );
    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
	
    @RequestMapping(value = "/changePassword", method = RequestMethod.GET)
    public ModelAndView showChangePasswordPage(final HttpServletRequest request, final Locale locale, final Model model, @RequestParam("id") final long id, @RequestParam("token") final String token) {
        final String result = securityUserService.validatePasswordResetToken(id, token);
        if (result != null) {
            model.addAttribute("message", messages.getMessage("auth.message." + result, null, locale));
            //return "redirect:/login?lang=" + locale.getLanguage();
            
            ModelAndView modelAndView = new ModelAndView("redirect:" + getAppUrl(request) + "/login");
            modelAndView.addObject("message", messages.getMessage("message.accountVerified", null, locale));
            return modelAndView;
            

        }
        //return "redirect:/updatePassword.html?lang=" + locale.getLanguage();
        ModelAndView modelAndView = new ModelAndView("redirect:" + getAppUrl(request) + "/login");
        modelAndView.addObject("message", messages.getMessage("message.accountVerified", null, locale));
        return modelAndView;
    }

    @RequestMapping(value = "/savePassword", method = RequestMethod.POST)
    @ResponseBody
    public GenericResponse savePassword(final Locale locale, @Valid PasswordDto passwordDto) {
        final User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.changeUserPassword(user, passwordDto.getPassword());
        return new GenericResponse(messages.getMessage("message.resetPasswordSuc", null, locale));
    }
    

    // change user password
    @RequestMapping(value = "/updatePassword", method = RequestMethod.POST)
    @ResponseBody
    public GenericResponse changeUserPassword(final Locale locale, @Valid @RequestBody PasswordDto passwordDto) {
        final User user = userService.findUserByEmail(((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail());
        if (!userService.checkIfValidOldPassword(user, passwordDto.getOldPassword())) {
            throw new InvalidOldPasswordException();
        }
        userService.changeUserPassword(user, passwordDto.getPassword());
        return new GenericResponse(messages.getMessage("message.updatePasswordSuc", null, locale));
    }
    
    @RequestMapping(value = "/changePassword", method = RequestMethod.POST)
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> changePassword(@RequestBody @Valid PasswordChanger passwordChanger) {
    	
    	if(passwordChanger.password.equals(passwordChanger.matchingPassword))
    	{

	        userDetailsService.changePassword(passwordChanger.oldPassword, passwordChanger.password);
	        Map<String, String> result = new HashMap<>();
	        result.put( "result", "success" );
	        return ResponseEntity.accepted().body(result);
    	}
    	
    	Map<String, String> result = new HashMap<>();
        result.put( "result", "password doesn't match" );
    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }
    
    static class PasswordChanger {
    	
    	//@ValidPassword
        public String oldPassword;
    	
    	@ValidPassword
        public String password;
    	
    	@ValidPassword
        public String matchingPassword;
    }
    
    /*

    @RequestMapping(value = "/user/update/2fa", method = RequestMethod.POST)
    @ResponseBody
    public GenericResponse modifyUser2FA(@RequestParam("use2FA") final boolean use2FA) throws UnsupportedEncodingException {
        final User user = userService.updateUser2FA(use2FA);
        if (use2FA) {
            return new GenericResponse(userService.generateQRUrl(user));
        }
        return null;
    }*/

    // ============== NON-API ============
    
    private SimpleMailMessage constructResendVerificationTokenEmail(final String contextPath, final Locale locale, final VerificationToken newToken, final User user) {
        final String confirmationUrl = contextPath + "/api/auth/verifyEmail?token=" + newToken.getToken();
        final String message = messages.getMessage("message.resendToken", null, locale);
        return constructEmail("Resend Registration Token", message + " \r\n" + confirmationUrl, user);
    }

    private SimpleMailMessage constructResetTokenEmail(final String contextPath, final Locale locale, final String token, final User user) {
        final String url = contextPath + "/changePassword?id=" + user.getId() + "&token=" + token;
        final String message = messages.getMessage("message.resetPassword", null, locale);
        return constructEmail("Reset Password", message + " \r\n" + url, user);
    }

    private SimpleMailMessage constructEmail(String subject, String body, User user) {
        final SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(subject);
        email.setText(body);
        email.setTo(user.getEmail());
        email.setFrom(env.getProperty("support.email"));
        return email;
    }

    private String getAppUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }

    public void authWithHttpServletRequest(HttpServletRequest request, String username, String password) {
        try {
            request.login(username, password);
        } catch (ServletException e) {
            LOGGER.error("Error while login ", e);
        }
    }

    public void authWithAuthManager(HttpServletRequest request, String username, String password) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        authToken.setDetails(new WebAuthenticationDetails(request));
        Authentication authentication = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
    }

    
    public void authWithoutPassword(User user) {
    	/*
        List<Privilege> privileges = user.getRoles().stream().map(role -> role.getPrivileges()).flatMap(list -> list.stream()).distinct().collect(Collectors.toList());
        List<GrantedAuthority> authorities = privileges.stream().map(p -> new SimpleGrantedAuthority(p.getName())).collect(Collectors.toList());

        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
        */
    	Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        System.out.println((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }
}