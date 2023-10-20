import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  getData() {
    return axios.get(`${this.apiUrl}/data`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

submitFavPlant(name:string, plant:string) {
    const body = { name, plant };
    return axios.post(`${this.apiUrl}/submit`, body);
}
}
