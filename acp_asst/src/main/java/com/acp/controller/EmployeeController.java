package com.acp.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.acp.entity.ApiResponse;
import com.acp.entity.Employee;
import com.acp.service.EmployeeService;

@RestController
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;

	/** This api will be used to upload employee data by csv file */
	@PostMapping(path = "/users/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ApiResponse uploadEmployeeData(@RequestParam("file") MultipartFile file) throws IOException {
		return employeeService.uploadEmployeeData(file);
	}

	/**
	 * this api will be used to fetch all employee on the basis of salary range
	 * , offset and limit
	 */
	@GetMapping("/users")
	public ApiResponse getEmployeeList(@RequestParam(required = false, name = "minSalary") Double minSalary,
			@RequestParam(required = false, name = "maxSalary") Double maxSalary,
			@RequestParam(required = false, name = "offset") Integer offset,
			@RequestParam(required = false, name = "limit") Integer limit) {
		return employeeService.getEmployeeList(minSalary, maxSalary, offset, limit);
	}

	/** this api will be used to get employee by id */
	@GetMapping("/users/{id}")
	public ApiResponse getEmployee(@PathVariable(value = "id") String employeeId) {
		return employeeService.getEmployee(employeeId);
	}

	/** this api will be used to create new employee */
	@PostMapping("/users")
	public ApiResponse createEmployee(@RequestBody Employee employee) {
		return employeeService.createEmployee(employee);
	}

	/** this api will be used to update employee details */
	@PutMapping("/users/{id}")
	public ApiResponse updateEmployee(@PathVariable(value = "id") String employeeId,
			@Valid @RequestBody Employee employee) {
		return employeeService.updateEmployee(employeeId, employee);
	}

	/** this api will be used to delete employee by Id */
	@DeleteMapping("/users/{id}")
	public ApiResponse deleteEmployee(@PathVariable(value = "id") String employeeId) {
		return employeeService.deleteEmployee(employeeId);
	}

}
