import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';


@Injectable()

export class GlobalSubscriptionService {

    private isLoggedInSubject=new Subject<boolean>();
    private isAdminRoleSubject=new Subject<boolean>();

    private loggedInStudentNameSubject=new Subject<string>();
    private loggedInImagePathSubject=new Subject<string>();

    isLoggedInState=this.isLoggedInSubject.asObservable();
    isAdminRoleState= this.isAdminRoleSubject.asObservable();

    loggedInStudentNameState= this.loggedInStudentNameSubject.asObservable();
    loggedInImagePathState= this.loggedInImagePathSubject.asObservable();

    constructor(){}

    isLoggedInUser(islogged){
        this.isLoggedInSubject.next(islogged)
    }

    isAdminRole(isAdmin){
        this.isAdminRoleSubject.next(isAdmin);
    }
    loggedInStudentName(studentName){
        this.loggedInStudentNameSubject.next(studentName);
    }
    loggedInImagePath(imagePath){
        this.loggedInImagePathSubject.next(imagePath);
    }
}
