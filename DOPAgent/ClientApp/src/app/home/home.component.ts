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

  videoIcon: string = "./assets/images/play.png";
  play: string = "Play";
  videodisabled: boolean = true;

  changeImg() {
    if (this.play == "Play") {
      this.play = "Pause",
        this.videoIcon = "./assets/images/pause.png",
        this.videodisabled = false
    }
    else {
      this.videoIcon = "./assets/images/play.png",
        this.play = "Play",
        this.videodisabled = true
    }
  }


}
