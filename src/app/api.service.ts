import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/api';

  getData() {
    return axios.get(`${this.apiUrl}/data`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
  }

  submitFavPlant(email:string, plant:string) {
    const data = { email, plant };
    const url = '/api/add-plant?email=' + email + '&favPlant=' + plant;

    axios.post(url)
    .then(() => {
      console.log("Successfully saved data!");
    })
    .catch(error => {
      console.error("ERROR:", error);
    });
  }
}
