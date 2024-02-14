import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  baseurl = 'http://localhost:8080/cart/';

  

  SendEmailAndOrder(order:Order) {
    
    return this.http.post<any>(`${this.baseurl}send-email`,order,{ observe: 'response', responseType: 'text' as 'json' });
  }
  
}
