import { FormGroup } from '@angular/forms';
import { MessagesConstants } from './constants';
import { ApiResponseModel } from './model/apiResponse.model';

export class UtitlityService {

  static getObjectFromJson<T>(json: string): T {
    try {
      if (json && json !== 'undefined' && json !== 'null') {
        return <T>JSON.parse(json);
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  static openModal(modalService: any, Componenttoopen: any, windowClass?: any): any {
    const modalRef = modalService.open(Componenttoopen, { backdrop: 'static', size: 'lg', keyboard: true, windowClass: windowClass });
    return modalRef;
  }

  static markFormGroupTouched(formGroup: FormGroup) {
    try {
      (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control.controls) {
          control.controls.forEach(c => this.markFormGroupTouched(c));
        }
      });
    } catch (ex) {
      // Code to handle exception
    }


  }

  static handleApiErrorResponse(error: Response): string {
    let errorMessage: string;
    let response: ApiResponseModel;
    if (error.status === 0) {
      errorMessage = MessagesConstants.connectionRefused;
      return errorMessage;

    } else {
      try {
        response = UtitlityService.getObjectFromJson<ApiResponseModel>(JSON.stringify(error.json()));
        if (response) {
          errorMessage = response.message;
        } else {
          errorMessage = error.statusText;
        }
      } catch (e) {
        console.log(e);
        errorMessage = error.statusText;

      }

      return errorMessage;
    }
  }
  static haveValidChars(value) {
    if (value.indexOf("%") > -1) {
      return false;
    }
    else if (value.indexOf("^") > -1) {
      return false;
    }
    else if (value.indexOf("`") > -1) {
      return false;
    }
    else if (value.indexOf("\\") > -1) {
      return false;
    }
    else if (value.replace(/\s/g, '').length == 0) {
      return false;
    }

    else {
      return true;
    }

  }
}
