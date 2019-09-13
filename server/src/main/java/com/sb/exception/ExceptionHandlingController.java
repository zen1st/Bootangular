package com.sb.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.sb.util.GenericResponse;

@ControllerAdvice
public class ExceptionHandlingController extends ResponseEntityExceptionHandler {

    private final Logger LOGGER = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private MessageSource messages;
    
  @ExceptionHandler(ResourceConflictException.class)
  public ResponseEntity<ExceptionResponse> resourceConflict(ResourceConflictException ex) {
    ExceptionResponse response = new ExceptionResponse();
    response.setErrorCode("Conflict");
    response.setErrorMessage(ex.getMessage());
    return new ResponseEntity<ExceptionResponse>(response, HttpStatus.CONFLICT);
  }
  
  @ExceptionHandler({ ReCaptchaInvalidException.class })
  public ResponseEntity<Object> handleReCaptchaInvalid(final RuntimeException ex, final WebRequest request) {
	  LOGGER.error("400 Status Code", ex);
      final GenericResponse bodyOfResponse = new GenericResponse(messages.getMessage("message.invalidReCaptcha", null, request.getLocale()), "InvalidReCaptcha");
      return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
  }
  
  @ExceptionHandler({ ReCaptchaUnavailableException.class })
  public ResponseEntity<Object> handleReCaptchaUnavailable(final RuntimeException ex, final WebRequest request) {
	  LOGGER.error("500 Status Code", ex);
      final GenericResponse bodyOfResponse = new GenericResponse(messages.getMessage("message.unavailableReCaptcha", null, request.getLocale()), "InvalidReCaptcha");
      return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
  }
  
}
