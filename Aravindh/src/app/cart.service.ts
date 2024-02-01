import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from './cart';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient,private route:Router) { }
  baseurl = 'http://localhost:8080/cart/';



  postCart(Cart:Cart){
    return this.http.post<any>(`${this.baseurl}addCart`, Cart);
  }

  getCart(){
    return this.http.get<any[]>(`${this.baseurl}getCart`);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  deleteCart(productId: number,userId:number): Observable<HttpResponse<string>> {
    // Note the responseType: 'text' to handle non-JSON response
    return this.http.delete<string>(`${this.baseurl}deleteCartId/${productId}/${userId}`, { observe: 'response', responseType: 'text' as 'json' });
  }


  getCartById(id:number){
    return this.http.get<any[]>(`${this.baseurl}getCartId/${id}`);

  }
}
