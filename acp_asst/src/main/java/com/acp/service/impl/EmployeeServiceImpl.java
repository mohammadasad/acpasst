package com.acp.service.impl;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.acp.dao.EmployeeDao;
import com.acp.entity.ApiResponse;
import com.acp.entity.Employee;
import com.acp.exception.BadRequestException;
import com.acp.helper.CSVHelper;
import com.acp.service.EmployeeService;
import com.acp.util.EmployeeUtil;

@Transactional
@Service
public class EmployeeServiceImpl implements EmployeeService {

	private static final Logger logger = LogManager.getLogger(EmployeeServiceImpl.class);

	@Autowired
	EmployeeDao emmployeeDao;

	@Autowired
	EmployeeUtil employeeUtil;

	@PersistenceContext
	private EntityManager entityManager;

	Optional<Employee> oemp = null;
	String message = null;
	int httpStatus;
	Object result = null;

	@Override
	public ApiResponse uploadEmployeeData(MultipartFile file) throws IOException {
		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.uploadEmployeeData()::Start::");
		result = null;
		message = null;
		httpStatus = 0;
		Boolean checkformat = CSVHelper.hasCSVFormat(file);
		Boolean flagDataCreated = false;
		if (checkformat) {
			List<Employee> emplist = CSVHelper.csvToEmployees(file.getInputStream());
			Set<String> empIdSet = new HashSet<String>();
			Set<Employee> dupEmp = emplist.stream().filter(emp -> !empIdSet.add(emp.getId()))
					.collect(Collectors.toSet());

			if (dupEmp.size() > 0) {
				throw new BadRequestException("Bad input - Duplicate row");
			}
			for (Employee emp : emplist) {
				oemp = emmployeeDao.findById(emp.getId());
				Optional<Employee> oempn = emmployeeDao.findByLogin(emp.getLogin());
				if (oempn.isPresent() && oemp.isPresent() && !(oemp.get().getLogin().equals(emp.getLogin()))) {
					throw new BadRequestException("Employee login is not unique");
				} else if (oemp.isPresent()) {
					Employee emps = oemp.get();
					BeanUtils.copyProperties(emp, emps, new String[] { "id" });
					emmployeeDao.save(emps);
				} else if (!oempn.isPresent() && !oemp.isPresent()) {
					flagDataCreated = true;
					emmployeeDao.save(emp);
				} else if (oempn.isPresent() && !oemp.isPresent()) {
					throw new BadRequestException("Employee login in not unique");
				}
			}

			if (flagDataCreated) {
				message = "Data Creatd or Uploaded";
				httpStatus = HttpStatus.CREATED.value();
			} else {
				message = "Success - and data updated";
				httpStatus = HttpStatus.OK.value();
			}
		} else {
			message = "Bad input - CSV file format is not proper.";
			httpStatus = HttpStatus.BAD_REQUEST.value();
		}
		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.uploadEmployeeData()::Start::");
		return new ApiResponse(httpStatus, message, result);
	}

	@Override
	public ApiResponse getEmployeeList(Double minSalary, Double maxSalary, Integer offset, Integer limit) {
		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.getEmployeeList()::Start::");
		result = null;
		message = null;
		httpStatus = 0;
		if (minSalary == null || minSalary < 0) {
			minSalary = 0.0;
		}
		if (maxSalary == null || minSalary < 0) {
			maxSalary = 4000.00;
		}
		if (offset == null || offset < 0) {
			offset = 0;
		}

		TypedQuery<Employee> query = entityManager.createQuery(
				"SELECT e FROM Employee e WHERE e.salary between :minSalary and :maxSalary order by id desc", Employee.class);
		query.setParameter("minSalary", minSalary);
		query.setParameter("maxSalary", maxSalary - 1);
		query.setFirstResult(offset);
		if (limit != null && limit > 0)
			query.setMaxResults(limit);
		result = query.getResultList();

		message = "Success but no data updated";
		httpStatus = HttpStatus.OK.value();

		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.getEmployeeList()::End::");
		return new ApiResponse(httpStatus, message, result);
	}

	@Override
	public ApiResponse getEmployee(String employeeId) {
		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.getEmployee()::Start::");
		oemp = emmployeeDao.findById(employeeId);
		result = null;
		message = null;
		httpStatus = 0;
		if (!oemp.isPresent()) {
			throw new BadRequestException("Bad input - no such employee");
		} else {
			message = "Success but no data updated";
			httpStatus = HttpStatus.OK.value();
			result = oemp.get();
		}
		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.getEmployee()::End::");
		return new ApiResponse(httpStatus, message, result);
	}

	@Override
	public ApiResponse createEmployee(Employee employee) {
		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.createEmployee()::Start::");
		result = null;
		message = null;
		httpStatus = 0;
		oemp = emmployeeDao.findById(employee.getId());
		Optional<Employee> oempn = emmployeeDao.findByLogin(employee.getLogin());
		if (oemp.isPresent()) {
			throw new BadRequestException("Employee ID already exists");
		} else if (oempn.isPresent()) {
			throw new BadRequestException("Employee login in not unique");
		} else if (!EmployeeUtil.isValidSalary(String.valueOf(employee.getSalary()))) {
			throw new BadRequestException("Invalid Salary");
		} else if (!EmployeeUtil.isValidDate(String.valueOf(employee.getStartDate()))) {
			throw new BadRequestException("Invalid Start Date");
		} else {
			emmployeeDao.save(employee);
			message = "Successfully crated";
			httpStatus = HttpStatus.CREATED.value();
		}

		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.createEmployee()::End::");

		return new ApiResponse(httpStatus, message, null);
	}

	@Override
	public ApiResponse updateEmployee(String employeeId, Employee employee) {
		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.updateEmployee()::Start::");
		result = null;
		message = null;
		httpStatus = 0;
		oemp = emmployeeDao.findById(employeeId);
		Optional<Employee> oempn = emmployeeDao.findByLogin(employee.getLogin());
		if (!oemp.isPresent()) {
			throw new BadRequestException("No such employee");
		} else if (oempn.isPresent() && !(oemp.get().getLogin().equals(employee.getLogin()))) {
			throw new BadRequestException("Employee login in not unique");
		} else if (!EmployeeUtil.isValidSalary(String.valueOf(employee.getSalary()))) {
			throw new BadRequestException("Invalid Salary");
		} else if (!EmployeeUtil.isValidDate(String.valueOf(employee.getStartDate()))) {
			throw new BadRequestException("Invalid Start Date");
		} else {
			Employee emp = oemp.get();
			BeanUtils.copyProperties(employee, emp, new String[] { "id" });
			emmployeeDao.save(emp);
			message = "Successfully updated";
			httpStatus = HttpStatus.CREATED.value();
		}
		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.updateEmployee()::End::");

		return new ApiResponse(httpStatus, message, null);
	}

	@Override
	public ApiResponse deleteEmployee(String employeeId) {
		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.deleteEmployee()::Start::");
		oemp = emmployeeDao.findById(employeeId);
		result = null;
		message = null;
		httpStatus = 0;
		if (!oemp.isPresent()) {
			message = "No such employee";
			httpStatus = HttpStatus.BAD_REQUEST.value();
		} else {
			emmployeeDao.delete(oemp.get());
			message = "Successfully deleted";
			httpStatus = HttpStatus.OK.value();
		}
		if (logger.isDebugEnabled())
			logger.debug("EmployeeServiceImpl.deleteEmployee()::End::");
		return new ApiResponse(httpStatus, message, result);
	}

}
