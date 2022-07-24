import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlResponseCodes } from '../../../../core/constants';
import { HttpAuthUserUtilsService } from '../../../../httpWrapperModule/http_auth_user_utils.service';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { UtitlityService } from '../../../../core/utils.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

searchEmployeeForm: FormGroup;
  employees: any[];
  currentEmployee: any;
  errorMessage:string;
  dataTable:any;

  constructor(private formBuilder: FormBuilder,private chRef: ChangeDetectorRef,private http_user:HttpAuthUserUtilsService,private router:Router) { }

  ngOnInit() {
  	console.log("employee-list is working");
  	this.http_user.getAllEmployee(this, true);

    this.searchEmployeeForm = this.formBuilder.group({
        minSalary: [''],
        maxSalary: [''],
        offset: [''],
        limit: ['']
    })
  }

  editEmployee(): void {
  	let selectEmpObj = this.employees.find(employeeObj => employeeObj.isSelect == true)

    if (selectEmpObj) {
    	localStorage.removeItem("editEmployeeId");
    	localStorage.setItem("editEmployeeId", selectEmpObj.id.toString());
    	this.router.navigate(['/dashboard/employee/update']);
    	this.errorMessage = "";
    } else {
    	this.errorMessage = "Please Choose one of the record to Edit.";
    }
  };

  searchEmployee(): void {
    if(this.searchEmployeeForm.valid){
        this.http_user.searchEmployee(this.searchEmployeeForm.value.minSalary,this.searchEmployeeForm.value.maxSalary,this.searchEmployeeForm.value.offset,this.searchEmployeeForm.value.limit, this,true)
    } else {
      UtitlityService.markFormGroupTouched(this.searchEmployeeForm);
    }
  };

  selectEmployee(event:any, employee:any) {
  	this.employees.forEach(value => {
  		// initially mark all checkbox unchecked.
  		if (employee != value)
  			value['isSelect'] = false;
	  });

    $("table tr").removeClass("selected");

    if (event.target.checked) {
      $("input[type=checkbox]:checked").parents("tr").addClass("selected");
    }

  }

  deleteEmployee(): void {
  	let selectEmployeeObj = this.employees.find(employeeObj => employeeObj.isSelect == true)

  	if(selectEmployeeObj) {
  		this.currentEmployee = selectEmployeeObj;
  		if(confirm("Are you sure to delete " + selectEmployeeObj.login)) {
	  		this.http_user.deleteEmployee(selectEmployeeObj, this, true);
		}
  	} else {
  		this.errorMessage = "Please Choose one of the record to Delete";
  	}
  };

	onSuccess(type: any, responsedata: any) {
		switch (type) {
		  case UrlResponseCodes.getAllEmployeeCode:
		  	this.employees = responsedata.result;

		  	this.employees.forEach(value => {
		  		// initially mark all checkbox unchecked.
		  			value['isSelect'] = false;
	  	   		}
		  	);

        this.chRef.detectChanges();
        const table: any = $('table');
        this.dataTable = table.DataTable();
		    console.log("Successfully get all employees");
		    break;
		  case UrlResponseCodes.deleteEmployeeCode:
        this.dataTable.row("tr.selected").remove().draw( false );
		  	this.employees = this.employees.filter(b => b !== this.currentEmployee);
		  	console.log("deleted employee Successfully", responsedata);
		  	break;
		}
	}

	onFailure(type: any, response: string) {
		switch (type) {
		  case UrlResponseCodes.getAllEmployeeCode:
		    this.errorMessage = response;
		    console.log("Error get all employees");
		    break;
		  case UrlResponseCodes.deleteEmployeeCode:
        this.errorMessage = response;
		  	console.log("deleted employee error exist");
		  	break;
		}
	}
}
