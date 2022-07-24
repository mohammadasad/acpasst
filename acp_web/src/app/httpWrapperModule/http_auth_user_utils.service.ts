import { LocalStorageService } from './../core/local-storage.service';
import { Injectable } from '@angular/core';
import { Constants, UrlConstants, UrlResponseCodes } from '../core/constants';
import { UtitlityService } from '../core/utils.service';
import { URLSearchParams } from '@angular/http';
import { HttpWrapper } from './http_wrapper';
import { HttpSuccesFailureResponse } from './http_wrapper_response.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpAuthUserUtilsService {
  // blob = any;

  constructor(private http:HttpClient,private myHttp: HttpWrapper,private spinner: NgxSpinnerService){
    try {
        myHttp.setHeader(Constants.authToken, LocalStorageService.getToken());

    } catch (e) {
      console.log(e);
    }
  }
  modelToQueryString(object: any) {
    const params = new URLSearchParams();
    for (const key in object) {
      params.set(key, object[key]);
    }
    return params.toString() + '&debug=true';
  }
  getAllEmployee(callback:HttpSuccesFailureResponse,showLoader: boolean){
    this.handleLoader(showLoader);
    this.myHttp.get<any>(UrlConstants.getAllEmployee, showLoader).subscribe(
      data => {
        this.handleLoader(false);
        callback.onSuccess(UrlResponseCodes.getAllEmployeeCode, data);
    },
    error => {
      const errorMessage: string = this.myHttp.handleApiErrorResponse(error);
      this.handleLoader(false)
      callback.onFailure(UrlResponseCodes.getAllEmployeeCode, errorMessage);
    });
  }



  searchEmployee(minSalary:any, maxSalary:any, offset:any, limit:any,callback:HttpSuccesFailureResponse,showLoader: boolean){
    this.handleLoader(showLoader);
    let qeryparam= '?minSalar='+minSalary+'&maxSalary='+maxSalary+'&offset='+offset+'&limit='+limit
    this.myHttp.get<any>(UrlConstants.getAllEmployee+qeryparam, showLoader).subscribe(
      data => {
        this.handleLoader(false);
        callback.onSuccess(UrlResponseCodes.getAllEmployeeCode, data);
    },
    error => {
      const errorMessage: string = this.myHttp.handleApiErrorResponse(error);
      this.handleLoader(false)
      callback.onFailure(UrlResponseCodes.getAllEmployeeCode, errorMessage);
    });
  }


  uploadEmployee(file:any,callback:HttpSuccesFailureResponse,showLoader: boolean){
    this.handleLoader(showLoader)
    const formData = new FormData();

    formData.append('file', file);

    this.myHttp.post<any>(UrlConstants.uploadEmployee, showLoader, formData).subscribe(
      data => {
        this.handleLoader(false);
        callback.onSuccess(UrlResponseCodes.uploadEmployeeCode, data);
        // if (data.status === Constants.responseSuccess) {
        // }
    },
    error => {
      const errorMessage: string = this.myHttp.handleApiErrorResponse(error);
      this.handleLoader(false);
      callback.onFailure(UrlResponseCodes.uploadEmployeeCode, errorMessage);
    });
  }

  getEmployeeById(employeeId:any, callback:HttpSuccesFailureResponse,showLoader: boolean){
    this.handleLoader(showLoader);

    this.myHttp.get<any>(UrlConstants.getEmployeeById+employeeId, showLoader).subscribe(
      data => {
        this.handleLoader(false);
        callback.onSuccess(UrlResponseCodes.getEmployeeByIdCode, data);
    },
    error => {
      const errorMessage: string = this.myHttp.handleApiErrorResponse(error);
      this.handleLoader(false)
      callback.onFailure(UrlResponseCodes.getEmployeeByIdCode, errorMessage);
    });
  }
  //acp project

  deleteEmployee(employee:any, callback:HttpSuccesFailureResponse,showLoader: boolean){
    this.handleLoader(showLoader);

    let empId = employee.id.toString();
    this.myHttp.delete<any>(UrlConstants.deleteEmployee + empId, showLoader).subscribe(
      data => {
        this.handleLoader(false);
        callback.onSuccess(UrlResponseCodes.deleteEmployeeCode, data);
    },
    error => {
      const errorMessage: string = this.myHttp.handleApiErrorResponse(error);
      this.handleLoader(false)
      callback.onFailure(UrlResponseCodes.deleteEmployeeCode, errorMessage);
    });
  }

//acp project

updateEmployee(id:any,name:any, login: any, salary:any,startDate:any,callback:HttpSuccesFailureResponse,showLoader: boolean){
  this.handleLoader(showLoader)
  const body = {id:id,name:name,login:login,salary:salary,startDate:startDate}
  this.myHttp.put<any>(UrlConstants.updateEmployee + id, showLoader, body).subscribe(
    data => {
      if (data.status === Constants.responseSuccess || data) {
        this.handleLoader(false);
        callback.onSuccess(UrlResponseCodes.updateEmployeecode, data);
    }
  },
  error => {
    const errorMessage: string = this.myHttp.handleApiErrorResponse(error);
    this.handleLoader(false)
    callback.onFailure(UrlResponseCodes.updateEmployeecode, errorMessage);
  });
}

  createEmployee(id:any,name:any, login: any, salary:any,startDate:any, callback:HttpSuccesFailureResponse,showLoader: boolean){
    this.handleLoader(showLoader)
    const body = {id:id,name:name,login:login,salary:salary,startDate:startDate}
    this.myHttp.post<any>(UrlConstants.createEmployee, showLoader, body).subscribe(
      data => {
        if (data.status === Constants.responseSuccessCreate) {
          this.handleLoader(false)
          callback.onSuccess(UrlResponseCodes.createEmployeeCode, data);
      }
    },
    error => {
      const errorMessage: string = this.myHttp.handleApiErrorResponse(error);
      this.handleLoader(false)
      callback.onFailure(UrlResponseCodes.createEmployeeCode, errorMessage);
    });
  }
//acp project

  handleLoader(showLoader){
    if (showLoader){
      this.spinner.show();
    } else{
      this.spinner.hide();
    }
  }
}
