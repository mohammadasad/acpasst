package com.acp.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import org.springframework.stereotype.Component;

@Component
public class EmployeeUtil {
	private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M/d/yyyy");
	private static DateTimeFormatter formatterDash = DateTimeFormatter.ofPattern("d-MMM-yy");
	private static DateTimeFormatter formatterInput = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	private static String DASH_SYMBOL = "-";

	public static LocalDate getLocalDate(String dateString){
		LocalDate localDate;
		if(dateString!=null && dateString.contains(DASH_SYMBOL)){
			localDate=LocalDate.parse(dateString,formatterDash);
		}
		else{
			localDate=LocalDate.parse(dateString,formatter);
		}
		
		return localDate;
	}
	public static  boolean isValidSalary(String amount){
	    boolean isValid = true;
	    try {
	    	if(amount==null) 
	    		isValid = false;
	        Double.parseDouble(amount); 
	    }
	    catch(NumberFormatException e){
	        isValid = false;
	    }
	     return isValid;
	}
	public static boolean isValidDate(String dateStr) {
		if (dateStr==null)
			 return false;
        try {
            LocalDate.parse(dateStr, formatterInput);
        } catch (DateTimeParseException e) {
            return false;
        }
        return true;
    }
	public static boolean isValidStartDate(String dateString) {
		
		if (dateString==null)
			 return false;
		if(dateString.contains(DASH_SYMBOL)){	
        try {
            LocalDate.parse(dateString, formatterDash);
        } catch (DateTimeParseException e) {
        	return false;
        }
		}
		else{
			 try {
		            LocalDate.parse(dateString, formatter);
		        } catch (DateTimeParseException e) {
		            return false;
		        }
			
		}
        return true;
    }
}
