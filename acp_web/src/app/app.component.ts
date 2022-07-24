import { LocalStorageService } from './core/local-storage.service';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoaderComponentService } from './components/common/loader/loader.service';
import { ShareDataSubscriptionService } from './components/common/sharedata-subscription.service';
import { MessagesConstants } from './core/constants';
import { APP_BASE_HREF } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public wShowHeaderFooter = false;
  public userId: any;
  public isCookiesDisabled = false;
  constructor(private router: Router,
     private activatedRoute: ActivatedRoute, private titleService: Title,
      private loaderService: LoaderComponentService,
    private sharedDataSubsriptionService: ShareDataSubscriptionService) {
    try {
      this.wShowHeaderFooter = LocalStorageService.getIsLoggedIn();
    } catch (e) {
      this.isCookiesDisabled = true;
    }

  }
  // tslint:disable-next-line:use-life-cycle-interface

  ngOnInit() {

    // Loader subscription start

    // try {
    //   if (LocalStorageService.getIsLoggedIn()) {
    //     this.userId = LocalStorageService.getUserId();
    //   }
    //   this.wShowHeaderFooter = LocalStorageService.getIsLoggedIn();
    // } catch (e) {
    //   console.log(e);
    // }

    // document.addEventListener('contextmenu', event => event.preventDefault());
    // document.onkeydown = function (e) {
    //     if (e.keyCode == 123) {
    //         return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'i'.charCodeAt(0))) {
    //         return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && (e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'c'.charCodeAt(0))) {
    //         return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && (e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'j'.charCodeAt(0))) {
    //         return false;
    //     }
    //     if (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'u'.charCodeAt(0))) {
    //         return false;
    //     }
    //     if (e.ctrlKey && (e.keyCode == 'S'.charCodeAt(0) || e.keyCode == 's'.charCodeAt(0))) {
    //         return false;
    //     }
    // }




    this.router.events.subscribe((event: RouterEvent) => {
      if (event['title']) {
        this.titleService.setTitle(event['title']);
      }
      this.navigationInterceptor(event);
      try {
        this.wShowHeaderFooter = LocalStorageService.getIsLoggedIn();
      } catch (e) {
        console.log(e);
      }
    });
    if (this.isCookiesDisabled) {
      alert(MessagesConstants.CookiesDisabled);
    }

  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loaderService.show();

    }
    if (event instanceof NavigationEnd) {
      this.loaderService.hide();

    }
    if (event instanceof NavigationCancel) {
      this.loaderService.hide();
    }
    if (event instanceof NavigationError) {
      this.loaderService.hide();
    }
  }
}
