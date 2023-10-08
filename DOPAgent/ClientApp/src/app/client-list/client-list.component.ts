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
  baseUrl: string;
  apiResponse: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this.baseUrl = baseUrl;


    this.getData();
  }

  NavigateToAdd() {

    this.router.navigate(['/add-client']);

  }

  OnDeleteClick(clientId: number) {

    const apiEndpoint = this.baseUrl + 'AddClientCnt/DeleteClient';

  
 

    this.http.post(apiEndpoint, clientId).subscribe(
      (response) => {

        this.apiResponse = response;

        if (this.apiResponse.message == "Success") {
    
          alert('Deleted Successfully');
          this.getData();
        }
      },
      (error) => {
    
        console.error('Error saving data', error);
      }
    );

    
  }


  OnUpdateClick(clientId: number) {

    this.router.navigate(['/add-client', clientId]);

  }


  getData() {
    this.http.get<ClientList[]>(this.baseUrl + 'AddClientCnt/GetAddClient').subscribe({
      next: result => {
        this.clientlistprop = result;
      
      },
      error: error => console.error(error)
    });
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
