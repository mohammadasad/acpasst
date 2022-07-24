package com.acp.helper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.multipart.MultipartFile;

import com.acp.entity.Employee;
import com.acp.exception.BadRequestException;
import com.acp.util.EmployeeUtil;
public class CSVHelper {
  public static String TYPE = "text/csv";
  public static String HASH_SYMBOL = "#";
  
  public static boolean hasCSVFormat(MultipartFile file) {
    if (!TYPE.equals(file.getContentType())) {
      return false;
    }
    return true;
  }
  public static List<Employee> csvToEmployees(InputStream is) {
    try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        CSVParser csvParser = new CSVParser(fileReader,
            CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {
      List<Employee> empList = new ArrayList<Employee>();
      Iterable<CSVRecord> csvRecords = csvParser.getRecords();
      Employee employee;
      for (CSVRecord csvRecord : csvRecords) {
    	  if(!HASH_SYMBOL.equals(csvRecord.getComment())){
    		   if(!EmployeeUtil.isValidSalary(String.valueOf(csvRecord.get(3)))){
    				throw new BadRequestException("Invalid Salary");
    			 }
    		   if(!EmployeeUtil.isValidStartDate(String.valueOf(csvRecord.get(4)))){
    				throw new BadRequestException("Invalid Start Date");
    			 }
         employee = new Employee(
        	  csvRecord.get(0),
              csvRecord.get(1),
              csvRecord.get(2),
              Double.parseDouble(String.valueOf(csvRecord.get(3))),
              EmployeeUtil.getLocalDate(csvRecord.get(4))
            );
        empList.add(employee);
    	  }
      }
      return empList;
    } catch (IOException e) {
      throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
    }
  }
}