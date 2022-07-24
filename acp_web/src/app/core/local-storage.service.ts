import {Injectable} from '@angular/core';
import { Constants } from './constants';

@Injectable()
export class LocalStorageService {

  static getToken(): any {
    return localStorage.getItem(Constants.authToken);
  }

  static setToken(token: any): void {
    localStorage.setItem(Constants.authToken, token.toString());
  }

  static deleteToken(): void {
    localStorage.removeItem(Constants.authToken);
  }

  static setUser(user): void {
    localStorage.setItem(Constants.userDataKey, JSON.stringify(user));
  }

  static getUser() {
     return JSON.parse(localStorage.getItem(Constants.userDataKey)) ;
  }

  static deleteUser(): void {
    localStorage.removeItem(Constants.userDataKey);

  }

  static getUserId(): number {
    const user = LocalStorageService.getUser();
    if (user) {
    return user.data.id;
      } else {
      return 0;
    }

  }

  static setUserType(type:string):void{
    localStorage.setItem(Constants.usetType, type);
  }

  static getUserTypeString(): string {
    if (localStorage.getItem(Constants.usetType)) {
      return localStorage.getItem(Constants.usetType).toLowerCase();
    }
  }

  static setIsLoggedIn(isLogin:boolean):void{
    localStorage.setItem(Constants.isLoggedInKey,String(isLogin));
  }

  static getIsLoggedIn():boolean {
    if  (JSON.parse(localStorage.getItem(Constants.isLoggedInKey))) {
      return true
    } else {
      return false
    }
  }


static clearStorage():void{
    localStorage.removeItem(Constants.userDataKey);
    localStorage.removeItem(Constants.authToken);
    localStorage.removeItem(Constants.usetType);
    localStorage.removeItem(Constants.isLoggedInKey);

}

}
