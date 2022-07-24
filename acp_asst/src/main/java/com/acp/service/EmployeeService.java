package com.acp.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.acp.entity.ApiResponse;
import com.acp.entity.Employee;

public interface EmployeeService {
	
	ApiResponse uploadEmployeeData(MultipartFile file) throws IOException;
	ApiResponse getEmployeeList(Double minSalary, Double maxSalary, Integer offset, Integer limit);
	ApiResponse getEmployee(String employeeId);
	ApiResponse createEmployee(Employee employee);
	ApiResponse updateEmployee(String employeeId,Employee employee);
	ApiResponse deleteEmployee(String employeeId);
	
	
}
