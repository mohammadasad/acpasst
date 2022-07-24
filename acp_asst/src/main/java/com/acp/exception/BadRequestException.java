package com.acp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
 
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException 
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public BadRequestException() {
        super();
    }
    public BadRequestException(String arg0) {
        super(arg0);
    }
    public BadRequestException(String arg0,Throwable arg1) {
        super(arg0,arg1);
    }
    public BadRequestException(Throwable arg0) {
        super(arg0);
    }
}