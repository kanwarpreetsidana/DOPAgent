import { Component } from '@angular/core';
import {NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})


export class AppComponent {
  title = 'app';
  isLoginPage: boolean;

  constructor(private router: Router) {
    // Subscribe to router events to update the 'isLoginPage' variable
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        
        if (event.url == '/' || event.url == '/login') {
          this.isLoginPage = true;
        }
        else {
          this.isLoginPage = false;
        }
      }
    });
  }
}



