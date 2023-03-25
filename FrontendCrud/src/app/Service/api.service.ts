import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  /* Making a Post Request */
  createEmployee(data: any) {
    let url = `${this.baseUrl}/create`;
    return this.http.post(url, data);
  }

  /* Making a Get Request */
  getEmployee() {
    return this.http.get(`${this.baseUrl}`);
  }

  /* Making a Put Request */
  updateEmployee(data: any, id: any) {
    console.log(id);
    console.log(data);
    let url = `${this.baseUrl}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers });
  }

  /* Making a Delete Request */
  deleteEmployee(_id: any) {
    console.log(_id);
    let url = `${this.baseUrl}/delete/${_id}`;
    return this.http.delete(url);
  }
}
