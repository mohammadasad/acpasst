package com.acp.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.DecimalMin;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "employee", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
            "login"
        })
})
public class Employee {
	
	@Id
    @Column(name = "id", updatable = false, nullable = false)
	private String id;
	
	@Column(name = "login",nullable = false)
	private String login;
	
	@Column(name = "name",nullable = false)
	private String name;
	
	@Column(name = "salary",nullable = false)
	@DecimalMin(value ="0.0" , message = "Invalid salary")
	private Double salary;
	
	
	@Column(name = "start_date",nullable = false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate startDate;


	
	
	public Employee(String id, String login, String name,Double salary, LocalDate startDate) {
		this.id = id;
		this.login = login;
		this.name = name;
		this.salary = salary;
		this.startDate = startDate;
	}

	public Employee() {
	}
	

	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getLogin() {
		return login;
	}


	public void setLogin(String login) {
		this.login = login;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public Double getSalary() {
		return salary;
	}


	public void setSalary(Double salary) {
		this.salary = salary;
	}


	public LocalDate getStartDate() {
		return startDate;
	}


	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
}
