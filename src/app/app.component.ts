import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plant-parenthood';
  userEmail: any;
  userPass: any;
  userName: string = '';
  favPlant: string = '';
  // perenual.com API key -> sk-MhcV6532d013e249f2610

  constructor(private apiService: ApiService) {}

  loginBtn() {
    console.log("logging in user", this.userEmail);
  }

  saveFavPlant() {
    console.log(this.userName + "'s favorite plant is a " + this.favPlant);

    this.apiService.submitFavPlant(this.userName, this.favPlant)
      .then(() => {
        console.log("Favorite plant saved successfully!");
      })
      .catch(error => {
        console.error("Error submitting data:", error);
      });
  }
}
