import { Component, NgModule, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})

export class AddClientComponent {
  apiResponse: any;
  Id: number = 0;
  RDAccNo!: string;
  HolderName!: string;
  CreatedDate!: string;
  baseUrl: string;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.baseUrl = baseUrl;

  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit() {
   
    this.route.paramMap.subscribe(params => {  
      const clientId = +params.get('clientId');

      if (clientId > 0) {

        const apiEndpoint = this.baseUrl + 'AddClientCnt/GetAddClientID';

        this.http.post(apiEndpoint, clientId).subscribe(
          (response) => {


            this.apiResponse = response;
            console.log(this.apiResponse);

            if (this.apiResponse.id > 0) {
              this.Id = this.apiResponse.id;
              this.RDAccNo = this.apiResponse.rdAcc;
              this.HolderName = this.apiResponse.holderName;



              const date = new Date(this.apiResponse.createdDate);

              // Get the year, month, and day components
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1 and pad with '0'
              const day = String(date.getDate()).padStart(2, '0');

              const formattedDate = `${year}-${month}-${day}`;

              this.CreatedDate = formattedDate;

            }
          },
          (error) => {
            // Handle any errors that occur during the HTTP request.

          }
        );
      }
   
    });
  }



  onSubmit() {
    // Send data to the server-side controller for saving to the database.
    const data = {
      Id: this.Id,
      RDAcc: this.RDAccNo,
      HolderName: this.HolderName,
      CreatedDate : this.CreatedDate

    };


    const apiEndpoint = this.baseUrl + 'AddClientCnt/InsertAddClient';

   

    this.http.post(apiEndpoint, data).subscribe(
      (response) => {

        this.apiResponse = response;
       
        if (this.apiResponse.message == "Success") {
        
          alert('Saved');
          this.RDAccNo = "";
          this.HolderName = "";
          this.router.navigate(['/client-list']);
          
        }
      },
      (error) => {
        // Handle any errors that occur during the HTTP request.
        console.error('Error saving data', error);
      }
    );




  }
 

}
