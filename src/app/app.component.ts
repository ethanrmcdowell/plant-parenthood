import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plant-parenthood';
  userEmail: string = '';
  userPass: string = '';
  userName: string = '';
  favPlant: string = '';
  // perenual.com API key -> sk-MhcV6532d013e249f2610

  constructor(private apiService: ApiService, private authService: AuthService) {}

  loginBtn() {
    this.authService.loginUser(this.userEmail, this.userPass, async (response) => {
      if (response.success) {
        console.log("SUCCESS:", response);
      } else {
        console.log("FAILURE:", response);
      }
    })
  }

  saveFavPlant() {
    console.log(this.userName + "'s favorite plant is a " + this.favPlant);

    this.apiService.submitFavPlant(this.userName, this.favPlant);
  }
}
