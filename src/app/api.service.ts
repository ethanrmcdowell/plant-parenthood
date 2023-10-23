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

    this.http.post('/api/add-plant', data)
      .pipe(
        tap({
          next: () => console.log('Plant data added successfully!'),
          error: error => console.error('Error adding plant data:', error)
        })
      )
      .subscribe();
  }
}
