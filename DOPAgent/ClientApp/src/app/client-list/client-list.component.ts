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
  isDropdownOpen: boolean = false;
  dropdownData: { stateName: string, stateId: string }[];
  selectedValue: number ;
  valueforstate: number;
  dropdownforcityData: { id: number, cityName: string }[];


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private router: Router) {
    this.baseUrl = baseUrl;
   
    this.getData();
  }

  ngOnInit() {
    const apiEndpoint = this.baseUrl + 'AddClientCnt/getstatedata';
    this.http.get(apiEndpoint).subscribe(
      (response) => {
        this.apiResponse = response;

        console.log(this.apiResponse);
        this.dropdownData = this.apiResponse
      } 

    )



   // this.dropdownData = [{ text: "test1", value: "Option 1" }, { text: "test2", value: "Option 2" }, { text: "test3", value: "Option 3" }];
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  NavigateToAdd() {

    this.router.navigate(['/add-client']);

  }

  onDropdownChange() {

    console.log('Selected value:', this.selectedValue);

    const apiEndpoint = this.baseUrl + 'AddClientCnt/getcitydata';
    this.http.post(apiEndpoint, { ID: 0, StateId: this.selectedValue, CityName:"test" } ).subscribe(
      (response) => {
        this.apiResponse = response;
        this.dropdownforcityData = this.apiResponse;
     
      }
    )

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
