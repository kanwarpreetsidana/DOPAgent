import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  Username : string;
  Password: string;
  baseUrl: string;
  apiResponse: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router, private cookieService: CookieService) {
    this.baseUrl = baseUrl;
  }


  loginbutton() {
    const data = {
      Username: this.Username,
      Password: this.Password,
    };


    const apiEndpoint = this.baseUrl + 'AddClientCnt/LoginUser';



    this.http.post(apiEndpoint, data).subscribe(
      (response) => {

        this.apiResponse = response;

        if (this.apiResponse.message == "Success") {

          console.log(this.apiResponse.token,"token");

          alert('Logged In Successfully.');
          localStorage.setItem('token', this.apiResponse.token);

          this.cookieService.set('username', data.Username);


          this.router.navigate(['/home']);

        }
        else {
          alert('Logged In Failed');
        }
      },
      (error) => {
        // Handle any errors that occur during the HTTP request.
        console.error('Error saving data', error);
      }
    )

  }

}
