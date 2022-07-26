package com.acp.exception;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.acp.entity.ApiResponse;

@SuppressWarnings({"unchecked","rawtypes"})
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
	
	private static final Logger logger  = LogManager.getLogger(GlobalExceptionHandler.class);
	ApiResponse apiError=null;
	
	   @ExceptionHandler(Exception.class)
	    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
	        List<String> details = new ArrayList<>();
	        ResponseEntity ressonseEntity=null;
	        String errorMessage=null;
	        details.add(ex.getLocalizedMessage());
	        errorMessage = "Server Error";
	        apiError = new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),errorMessage,null);
	        ressonseEntity=new ResponseEntity(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
	        logger.error(details,ex);
	        return ressonseEntity;
	    }

	   @ExceptionHandler(RecordNotFoundException.class)
	    public final ResponseEntity<Object> handleUserNotFoundException(RecordNotFoundException ex, WebRequest request) {
	        apiError = new ApiResponse(HttpStatus.NOT_FOUND.value(), ex.getLocalizedMessage(),null);
	        logger.error(apiError,ex);
	        return new ResponseEntity(apiError,HttpStatus.NOT_FOUND);
	    }
	   @ExceptionHandler(BadRequestException.class)
	    public final ResponseEntity<Object> handleUserNotFoundException(BadRequestException ex, WebRequest request) {
	        apiError = new ApiResponse(HttpStatus.BAD_REQUEST.value(), ex.getLocalizedMessage(),null);
	        logger.error(apiError,ex);
	        return new ResponseEntity(apiError,HttpStatus.BAD_REQUEST);
	    }
	   @Override
	   protected ResponseEntity<Object> handleMethodArgumentNotValid(
	     MethodArgumentNotValidException ex, 
	     HttpHeaders headers, 
	     HttpStatus status, 
	     WebRequest request) {
	       List<String> errors = new ArrayList<String>();
	       for (FieldError error : ex.getBindingResult().getFieldErrors()) {
	           errors.add(error.getField() + ": " + error.getDefaultMessage());
	       }
	       for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
	           errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
	       }
	       
	       ApiError apiError = 
	         new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
	       return handleExceptionInternal(
	         ex, apiError, headers, apiError.getStatus(), request);
	   }
	   @ExceptionHandler({ ConstraintViolationException.class })
	   public ResponseEntity<Object> handleConstraintViolation(
	     ConstraintViolationException ex, WebRequest request) {
	       List<String> errors = new ArrayList<String>();
	       for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
	           errors.add(violation.getRootBeanClass().getName() + " " + 
	             violation.getPropertyPath() + ": " + violation.getMessage());
	       }

	       ApiError apiError = 
	         new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors);
	       return new ResponseEntity<Object>(
	         apiError, new HttpHeaders(), apiError.getStatus());
	   }
	   @ExceptionHandler({ MethodArgumentTypeMismatchException.class })
	   public ResponseEntity<Object> handleMethodArgumentTypeMismatch(
	     MethodArgumentTypeMismatchException ex, WebRequest request) {
	       String error = 
	         ex.getName() + " should be of type " + ex.getRequiredType().getName();

	       ApiError apiError = 
	         new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), error);
	       return new ResponseEntity<Object>(
	         apiError, new HttpHeaders(), apiError.getStatus());
	   }
}
