import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {

  public clientlistprop: ClientList[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    console.log(baseUrl + 'AddClientCnt/GetAddClient');

    http.get<ClientList[]>(baseUrl + 'AddClientCnt/GetAddClient').subscribe({
      next: result => {
        this.clientlistprop = result;
        console.log(result, "testtest");
        console.log(this.clientlistprop);
      },
      
      error: error => console.error(error)
    });
  }

  NavigateToAdd() {

    this.router.navigate(['/add-client']);

  }

}

interface ClientList
{
  id: number
  , rdAcc: string
  , holderName: string
  , createdDate: Date
  , createdBy: string
  , isActive: boolean

}
