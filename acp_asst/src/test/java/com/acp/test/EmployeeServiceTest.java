package com.acp.test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.acp.entity.ApiResponse;
import com.acp.entity.Employee;
import com.acp.service.EmployeeService;

@ExtendWith(SpringExtension.class)
@RunWith(SpringRunner.class)
@SpringBootTest
public class EmployeeServiceTest {

	@Test
	public void contextLoads() {
	}

	@Autowired
	private WebApplicationContext webApplicationContext;

	@MockBean
	private EmployeeService employeeService;

	@Test
	public void whenFileUploaded_thenVerifyStatus() throws Exception {
		MockMultipartFile file = new MockMultipartFile("file", "hello.csv", MediaType.MULTIPART_FORM_DATA_VALUE,
				"Hello, World!".getBytes());

		MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
		mockMvc.perform(multipart("/users/upload").file(file)).andExpect(status().isOk());
	}

	@Test
	public void testGetEmployee() throws Exception {
		Employee employee = getEmployee();
		given(employeeService.getEmployee("emp1")).willReturn(getApiResponse(employee));
		ApiResponse result = employeeService.getEmployee("emp1");
		assertEquals(result.getResult(), employee);
	}

	@Test
	public void testCreateEmployee() throws Exception {
		Employee employee = getEmployee();
		given(employeeService.createEmployee(employee)).willReturn(getApiResponse(employee));
		ApiResponse result = employeeService.createEmployee(employee);
		assertEquals(result.getResult(), employee);
	}

	@Test
	public void testUpdateEmployee() throws Exception {
		Employee employee = getEmployee();
		given(employeeService.updateEmployee("emp01", employee)).willReturn(getApiResponse(employee));
		ApiResponse result = employeeService.updateEmployee("emp01", employee);
		assertEquals(result.getStatus(), HttpStatus.OK.value());
	}

	@Test
	public void testDeleteEmployee() throws Exception {
		given(employeeService.deleteEmployee("emp01")).willReturn(getApiResponse());
		ApiResponse result = employeeService.deleteEmployee("emp01");
		assertEquals(result.getStatus(), HttpStatus.OK.value());
	}

	@Test
	public void testGetEmployeeList() throws Exception {
		Employee employee = getEmployee();
		given(employeeService.getEmployeeList(100.0, 4000.0, 0, 10)).willReturn(getApiResponse(employee));
		ApiResponse result = employeeService.getEmployeeList(100.0, 4000.0, 0, 10);
		assertEquals(result.getResult(), employee);
	}

	private Employee getEmployee() {
		Employee emp = new Employee();
		emp.setId("emp1");
		emp.setName("manager");
		emp.setLogin("1");
		emp.setSalary(3000.0);
		emp.setStartDate(LocalDate.parse("2011-01-02"));
		return emp;
	}

	private ApiResponse getApiResponse(Employee emp) {
		return new ApiResponse(HttpStatus.OK.value(), "success", emp);
	}

	private ApiResponse getApiResponse() {
		return new ApiResponse(HttpStatus.OK.value(), "success", null);
	}
}
