import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './car';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CarService {

 
  constructor(private http: HttpClient) { }
  baseurl = 'http://localhost:8080/jwt/';

  signup(car: Car): Observable<any> {
    return this.http.post<any>(`${this.baseurl}addUser`, car);
  }

  signin(car: any): Observable<any> {
    return this.http.post<any>( `${this.baseurl}authenticate`,car);
 }

 getAllUser(){
  return this.http.get<Car[]>(`${this.baseurl}getAllUser`)
 }

 updateRoles(id:number,car: Car){


  return this.http.put<any>( `${this.baseurl}updateRoles/${id}`,car);
 }


}
