import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlResponseCodes } from '../../../../core/constants';
import { Router } from '@angular/router';
import { HttpAuthUserUtilsService } from '../../../../httpWrapperModule/http_auth_user_utils.service';
import { LocalStorageService } from '../../../../core/local-storage.service';
import { UtitlityService } from '../../../../core/utils.service';


@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  employeeUpdateForm: FormGroup;
  errorMessage:string;
  employeeId:string;


  constructor(private formBuilder: FormBuilder,private http_user:HttpAuthUserUtilsService,private router:Router) { }

  ngOnInit() {
  	console.log("employee-update is working");

  	this.employeeId = localStorage.getItem("editEmployeeId");

    if(!this.employeeId) {
      console.log("Invalid action.");
      this.router.navigate(['/dashboard/board/list']);
      return;
    }

    this.employeeUpdateForm = this.formBuilder.group({
      empId: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      empName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      empLogin: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      salary: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      startdate: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.http_user.getEmployeeById(this.employeeId, this, true);
  }

	employeeUpdate(){

		if(this.employeeUpdateForm.valid){
		    this.http_user.updateEmployee(this.employeeUpdateForm.value.empId,this.employeeUpdateForm.value.empName,this.employeeUpdateForm.value.empLogin,this.employeeUpdateForm.value.salary,this.employeeUpdateForm.value.startdate, this,true)
		} else {
			UtitlityService.markFormGroupTouched(this.employeeUpdateForm);
		}
	}


  onSuccess(type: any, responsedata: any) {
  		console.log("success");
		switch (type) {
			case UrlResponseCodes.getEmployeeByIdCode:
				this.employeeUpdateForm.setValue({
					empId: responsedata.result.id,
					empName: responsedata.result.name,
					empLogin: responsedata.result.login,
					salary: responsedata.result.salary,
          startdate: responsedata.result.startDate,
				});

				console.log("Successfully get Employee");
				break;

			case UrlResponseCodes.updateEmployeecode:
				this.router.navigate(['/dashboard/employee/list'])
			 	console.log("Successfully updated the employee");
			 	break;
		}
	}

	onFailure(type: any, response: string) {
		switch (type) {
		  case UrlResponseCodes.getEmployeeByIdCode:
		    this.errorMessage = response;
		    console.log("Error get employee", this.errorMessage);
		    break;
		  case UrlResponseCodes.updateEmployeecode:
		  	this.errorMessage = response;
		    console.log("Error get employee", this.errorMessage);
		    break;
		}
	}

}
