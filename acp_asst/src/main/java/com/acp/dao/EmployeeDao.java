package com.acp.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acp.entity.Employee;

@Repository
public interface EmployeeDao extends JpaRepository<Employee, Integer> {
	
	Optional<Employee> findById(String id);
	Optional<Employee> findByLogin(String login);
	
	//List<Employee> getEmployeeListBySalaryRange(Double minSalary, Double maxSalary, Integer offset, String limit);

}
