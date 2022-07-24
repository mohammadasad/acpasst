
import { Injectable } from "@angular/core";


@Injectable()
export class DeeplinkService {
 constructor() {}
 deeplink() {
   let ua = navigator.userAgent.toLowerCase();
   let isAndroid = ua.indexOf("android") > -1; // android check
   let isIphone = ua.indexOf("iphone") > -1; // ios check
   if (isIphone == true) {
  //   let app = {
  //     launchApp: function() {
  //      setTimeout(function() {
  //        window.location.href = "https://itunes.apple.com/us/app/appname/appid";
  //      }, 25);
  //      window.location.href = "bundlename://linkname"; //which page to open(now from mobile, check its authorization)
  //     },
  //     openWebApp: function() {
  //      window.location.href = "https://itunes.apple.com/us/app/appname/appid";
  //     }
  // };
  // app.launchApp();
} else if (isAndroid== true) {
    let app = {
      launchApp: function() {
         window.location.replace("app://growaajdeeplink");
        setTimeout(this.openWebApp, 500);
      },
      openWebApp: function() {
        window.location.href =  "https://play.google.com/store/apps/details?id=com.growaaj";
      }
  };
  app.launchApp();
 }else{
  //navigate to website url
 }
}
}
