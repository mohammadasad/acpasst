import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectAboutus(){
    this.router.navigate(['/sharedall/aboutus'])
  }
  redirectContactus(){
    this.router.navigate(['/sharedall/contactus'])
  }
  redirectGservices(){
    this.router.navigate(['/sharedall/gservices'])
  }
  redirectHomePage(){
    this.router.navigate(['/home'])
  }
  redirectToShowCareer(){
    this.router.navigate(['/sharedall/showcareer'])
  }
}
