import { Component, NgModule, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})

export class AddClientComponent {
  RDAccNo!: string;
  HolderName!: string;
    baseUrl: string;
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _formBuilder: FormBuilder) {
    this.baseUrl = baseUrl;
   
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }


  onSubmit() {
    // Send data to the server-side controller for saving to the database.
    const data = {
      RDAccNo: this.RDAccNo,
      HolderName: this.HolderName
    };


    const apiEndpoint = this.baseUrl + 'AddClientCnt/InsertAddClient';

    console.log(apiEndpoint);
    console.log(data);

    this.http.post(apiEndpoint, data).subscribe(
      (response) => {
        // Handle the successful response from the server here.
        console.log('Data saved successfully', response);
      },
      (error) => {
        // Handle any errors that occur during the HTTP request.
        console.error('Error saving data', error);
      }
    );


  }
}
