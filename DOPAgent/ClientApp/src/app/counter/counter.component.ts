import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr";


@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;
  private hubConnection: signalR.HubConnection;

  public user = "YourUserName"; // Define your username here
  public message = "Hello, SignalR!"; // Define your message here
  public messages: string[] = [];


  ngOnInit() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5142/ChatHub', {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
      })
      .build();

    console.log("aa")

    this.hubConnection.start()
      .then(() => {
        console.log("Hub Connection Started");
      })
      .catch(err => {
        console.error("Error while starting hub: " + err);
      });



    this.hubConnection.on("ReceiveMessage", (user: string, message: string) => {
     
      console.log(message);
      this.message = message;

    });

  }





  // Ensure this code is present in all three tabs

  public incrementCounter() {
    // Send a message from the client to the server
    this.hubConnection.invoke('SendMessage', this.user, this.message);



    this.currentCount++;
  }

}
