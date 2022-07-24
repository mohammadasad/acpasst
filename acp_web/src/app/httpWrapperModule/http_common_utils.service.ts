import { UrlConstants, UrlResponseCodes } from './../core/constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../core/constants';
import { HttpWrapper } from './http_wrapper';
import { HttpSuccesFailureResponse } from './http_wrapper_response.interface';
import { ApiResponseModel } from '../core/model/apiResponse.model';
import { LocalStorageService } from '../core/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class HttpCommonUtilsService {

  constructor(private myHttp: HttpWrapper, private router: Router,private spinner: NgxSpinnerService) {
    myHttp.setHeader('Content-Type', 'application/json');

  }

handleLoader(showLoader){
  if (showLoader){
    this.spinner.show();
  } else{
    this.spinner.hide();
  }
}

}
