import { environment } from '../../environments/environment';


export class Constants {
  static baseURL = environment.baseURL;
  static WebUrl = environment.hostUrl;
  static responseSuccess = 200;
  static responseSuccessCreate = 201;
  static responseInternalServer = '5XX';
  static userAgent = 'userAgent';
  static usetType = 'user_type';
  static isLoggedInKey = 'isLoggedIn';
  static authToken = 'Authorization';
  static defaultLanguage = 'defaul-language';
  static userDataKey = 'User';
  static pageSize = 20;
  static appVersion = '3.1.2';

}
export class MessagesConstants {
  static connectionRefused = 'Connection refused. Please check your connection';
  static CookiesDisabled = 'your browser has cookies disabled. \
  Make sure your cookies are enabled and try again.":"your browser has cookies disabled. Make sure your cookies are enabled and try again.';

}
export class UrlConstants {
  //api declaration goes here//
  static baseURLUserService = environment.baseURL;
  static localUrl = 'http://localhost:8000/' + environment.baseURL;
  //acp project
  static createEmployee = UrlConstants.baseURLUserService.concat('users');
  static getAllEmployee = UrlConstants.baseURLUserService.concat('users');
  static getEmployeeById = UrlConstants.baseURLUserService.concat('users/');
  static updateEmployee = UrlConstants.baseURLUserService.concat('users/');
  static deleteEmployee = UrlConstants.baseURLUserService.concat('users/');
  static uploadEmployee = UrlConstants.baseURLUserService.concat('users/upload');
  //acp project
}
export class UrlResponseCodes {
  //acp project
  static getAllEmployeeCode = 'get-all-employee-code';
  static createEmployeeCode = 'create-employee';
  static getEmployeeByIdCode = 'get-employee';
  static updateEmployeecode = 'update-employee';
  static uploadEmployeeCode = 'upload-employee';
  static deleteEmployeeCode = 'delete-employee';
  //acp project
}
