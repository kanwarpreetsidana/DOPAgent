import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  Username: string;

  constructor(private cookieService: CookieService) {

    this.Username = this.cookieService.get('username');

  }


}
