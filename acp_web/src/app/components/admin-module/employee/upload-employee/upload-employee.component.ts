import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UrlResponseCodes } from '../../../../core/constants';
import { Router } from '@angular/router';
import { HttpAuthUserUtilsService } from '../../../../httpWrapperModule/http_auth_user_utils.service';
import { LocalStorageService } from '../../../../core/local-storage.service';
import { UtitlityService } from '../../../../core/utils.service';


@Component({
  selector: 'app-uploadEmployee',
  templateUrl: './upload-employee.component.html',
  styleUrls: ['./upload-employee.component.scss']
})
export class UploadEmployeeComponent implements OnInit {
    employeeUploadForm: FormGroup;
    errorInLogin = false;
    errorMessage:string;
    file:any;
    constructor(private formBuilder: FormBuilder,private http_user:HttpAuthUserUtilsService,private router:Router) { }

    ngOnInit() {
        console.log("upload-employee is working");

        this.employeeUploadForm = this.formBuilder.group({
             file: ['']
        })

    }

    onFileChange($event) {
      console.log($event.target.files[0], typeof($event.target.files[0]));
      this.file= $event.target.files[0];
    }

    uploadEmployee(){
        if(this.employeeUploadForm.valid){
          if(this.file==undefined || this.file==null){
            alert("Please select csv file");
            return false;
          }
            this.file=(this.file==undefined || this.file==null)?(new File([""], "testfile")):this.file;
            this.http_user.uploadEmployee(this.file, this,true)
        } else {
          UtitlityService.markFormGroupTouched(this.employeeUploadForm);
        }
    }
    onSuccess(type: any, responsedata: any) {
        switch (type) {
          case UrlResponseCodes.uploadEmployeeCode:
            this.errorInLogin = false;
            alert("All data uploaded Successfully");
            this.router.navigate(['/dashboard/employee/list'])
            break;
        }
      }

      onFailure(type: any, response: string) {
        switch (type) {
          case UrlResponseCodes.uploadEmployeeCode:
            this.errorInLogin = true;
            this.errorMessage = response;
            break;

        }
      }
}
