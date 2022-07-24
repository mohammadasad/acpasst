package com.acp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
 
@ResponseStatus(HttpStatus.NOT_FOUND)
public class RecordNotFoundException extends RuntimeException 
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public RecordNotFoundException() {
        super();
    }
    public RecordNotFoundException(String arg0) {
        super(arg0);
    }
    public RecordNotFoundException(String arg0,Throwable arg1) {
        super(arg0,arg1);
    }
    public RecordNotFoundException(Throwable arg0) {
        super(arg0);
    }
}