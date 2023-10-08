import { Component, NgModule, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})

export class AddClientComponent {
  apiResponse: any;
  RDAccNo!: string;
  HolderName!: string;
  CreatedDate!: Date;
  baseUrl: string;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _formBuilder: FormBuilder, private router: Router) {
    this.baseUrl = baseUrl;

  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }


  onSubmit() {
    // Send data to the server-side controller for saving to the database.
    const data = {
      Id: "12344",
      RDAcc: this.RDAccNo,
      HolderName: this.HolderName,
      CreatedDate : this.CreatedDate

    };


    const apiEndpoint = this.baseUrl + 'AddClientCnt/InsertAddClient';

    console.log(apiEndpoint);
    console.log(data);

    this.http.post(apiEndpoint, data).subscribe(
      (response) => {

        this.apiResponse = response;
       
        if (this.apiResponse.message == "Success") {
          console.log("true");
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
