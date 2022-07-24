import { concat } from 'rxjs/observable/concat';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataSubscriptionService } from '../sharedata-subscription.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtitlityService } from '../../../core/utils.service';
import { MessagesConstants, UrlResponseCodes } from '../../../core/constants';
import { LoaderComponentService } from '../loader/loader.service';
import { LoaderState } from '../loader/loader';
import { LocalStorageService } from '../../../core/local-storage.service';
import { RouterModule } from '@angular/router';
import { HttpAuthUserUtilsService } from '../../../httpWrapperModule/http_auth_user_utils.service';
import { GlobalSubscriptionService } from '../../../globalSubscription.service';
import { Subscription } from 'rxjs';
import { HttpCommonUtilsService } from '../../../httpWrapperModule/http_common_utils.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userData:any;
  errorInLogin: boolean;
  isAdminRole: any;
  subscription: Subscription;
  mobileNumber:string;
  studentName:string;
  imagePath:string;
  boardAndClass: any[];
  public errorMessage = '';
  isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

  constructor(private user_http: HttpCommonUtilsService,private modalService: NgbModal, private router: Router,private http_auth: HttpAuthUserUtilsService,
    private shareDataSubscriptionService: ShareDataSubscriptionService, private loaderService: LoaderComponentService, private globalSubscriptionService: GlobalSubscriptionService) {
  }

  ngOnInit() {

  //   //this.http_auth.getAllBoardAndClass(this, true);
  //   if(this.studentName!=null && !(typeof this.studentName===undefined) && this.studentName.length>13){
  //       this.studentName=this.studentName.substr(0,13);
  //   }
  //   this.isLoggedIn = LocalStorageService.getIsLoggedIn();
  //   this.studentName = LocalStorageService.getUser().studentName;
  //   this.imagePath = LocalStorageService.getUser().imagePath;
  //   if (LocalStorageService.getUser())
  //     this.isAdminRole = LocalStorageService.getUser()["roleName"] === "Admin" ? true : false;
  //   else
  //     this.isAdminRole = false;
  //
  //   try {
  //     this.subscription = this.globalSubscriptionService.isLoggedInState
  //            .subscribe((data) => {
  //              this.isLoggedIn = data;
  //     });
  //     this.subscription = this.globalSubscriptionService.isAdminRoleState
  //            .subscribe((data) => {
  //              this.isAdminRole = data;
  //     });
  //     this.subscription = this.globalSubscriptionService.loggedInStudentNameState
  //              .subscribe((data) => {
  //              this.studentName = data;
  //     });
  //     this.subscription = this.globalSubscriptionService.loggedInImagePathState
  //            .subscribe((data) => {
  //              this.imagePath = data;
  //     });
  //
  //    } catch (e) {
  //    }
  // }
  // redirectLogin(){
  //   this.router.navigate(['/login'])
  // }
  // redirectHomePage(){
  //   this.router.navigate(['/home'])
  // }
  // redirectRegister(){
  //   this.router.navigate(['/register'])
  // }
  // redirectToViewProfile(){
  //   this.router.navigate(['/user/viewProfile'])
  // }
  // redirectToBoardList(){
  //   this.router.navigate(['/dashboard/board/list'])
  // }
  // redirectAboutus(){
  //   this.router.navigate(['/sharedall/aboutus'])
  // }
  // redirectContactus(){
  //   this.router.navigate(['/sharedall/contactus'])
  // }
  // redirectGservices(){
  //   this.router.navigate(['/sharedall/gservices'])
  // }
  // redirectToUserClass(){
  //   this.mobileNumber = LocalStorageService.getUser().mobileNumber;
  //   this.router.navigate(['/user/classes/detail'])
  // }
  // redirectToUserBookmarks(){
  //   this.router.navigate(['/user/bookmarks'])
  // }
  // redirectToUserFeedback(){
  //   this.router.navigate(['/user/feedback'])
  // }
  // redirectToShowCareer(){
  //   this.router.navigate(['/sharedall/showcareer'])
  // }
  // logout(){
  //   this.userData = LocalStorageService.getUser();
  //   this.user_http.userLogout(this.userData.studentName,this.userData.userName,this.userData.email,this,true)
  // }
  // goToSubjectPage(classId:any){
  //   localStorage.removeItem("classIdLogin");
  //   localStorage.setItem("classIdLogin",classId);
  //    this.router.navigate(['/user/subject'])
  // }
  // onSuccess(type: any, responseData: any[]) {
  //   switch (type) {
  //     case UrlResponseCodes.userLogoutCode:
  //       this.errorInLogin = false;
  //       this.isLoggedIn = false;
  //       this.isAdminRole = false;
  //       this.studentName = null;
  //       this.imagePath = null;
  //
  //       LocalStorageService.setIsLoggedIn(false);
  //       this.subscription = this.globalSubscriptionService.isLoggedInState
  //         .subscribe((data) => {
  //           this.isLoggedIn = data;
  //          });
  //          this.subscription = this.globalSubscriptionService.isAdminRoleState
  //                 .subscribe((data) => {
  //                   this.isAdminRole = data;
  //          });
  //          this.subscription = this.globalSubscriptionService.loggedInStudentNameState
  //                   .subscribe((data) => {
  //                   this.studentName = data;
  //          });
  //          this.subscription = this.globalSubscriptionService.loggedInImagePathState
  //                 .subscribe((data) => {
  //                   this.imagePath = data;
  //          });
  //       this.router.navigate(['/login'])
  //       break;
  //       case UrlResponseCodes.getAllBoardAndClassCode:
  //  		  	this.boardAndClass = responseData;
  //       break;
  //   }
  // }
  //
  // onFailure(type: any, response: string) {
  //   switch (type) {
  //     case UrlResponseCodes.userLogoutCode:
  //       this.errorInLogin = true;
  //       this.router.navigate(['/login'])
  //       break;
  //       case UrlResponseCodes.getAllBoardAndClassCode:
  //   		     this.errorMessage = response;
  //   		    console.log("Error get all boards and class");
  //   		    break;
  //   }
  // }
  // ngOnDestroy() {
  //       this.subscription.unsubscribe();
  //   }

}
}
