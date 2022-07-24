import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlResponseCodes } from '../../../../core/constants';
import { Router } from '@angular/router';
import { HttpAuthUserUtilsService } from '../../../../httpWrapperModule/http_auth_user_utils.service';
import { LocalStorageService } from '../../../../core/local-storage.service';
import { UtitlityService } from '../../../../core/utils.service';


@Component({
  selector: 'app-employeeCreate',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {
    employeeCreateForm: FormGroup;
    errorInLogin = false;
    errorMessage:string;
    constructor(private formBuilder: FormBuilder,private http_user:HttpAuthUserUtilsService,private router:Router) { }

    ngOnInit() {
        console.log("employee-create is working");

        this.employeeCreateForm = this.formBuilder.group({
            empId: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            empName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            empLogin: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            salary: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            startdate: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        })
    }

    employeeCreate(){
        if(this.employeeCreateForm.valid){
          var startdate=this.employeeCreateForm.value.startdate;
            this.http_user.createEmployee(this.employeeCreateForm.value.empId,this.employeeCreateForm.value.empName,this.employeeCreateForm.value.empLogin,this.employeeCreateForm.value.salary,startdate, this,true)
        } else {
          UtitlityService.markFormGroupTouched(this.employeeCreateForm);
        }
    }
    onSuccess(type: any, responsedata: any) {
        switch (type) {
          case UrlResponseCodes.createEmployeeCode:
            this.errorInLogin = false;
            this.router.navigate(['/dashboard/employee/list'])
            break;
        }
      }

      onFailure(type: any, response: string) {
        switch (type) {
          case UrlResponseCodes.createEmployeeCode:
            this.errorInLogin = true;
            this.errorMessage = response;
            break;

        }
      }
}
