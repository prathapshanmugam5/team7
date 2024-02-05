import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Car } from 'src/app/car';
import { CarService } from 'src/app/car.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
 
})
export class LoginComponent {


  loginForm: FormGroup;
  errorMessage: string;  // Add a variable to store the error message

  constructor(private formBuilder: FormBuilder, private route: Router, private ser: CarService,private matSnak:MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
    });
  }

 

  login() {
    const log = this.loginForm.value as Car;
    this.ser.signin(log).subscribe(
      (res) => {
        console.log(res);
  
        const user = {
          id:res.id,
          username: res.name,
          age: res.age,
          mobile: res.mobile,
          gender: res.gender,
          roles: res.roles
          // Add other user details if needed
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', res.token); // Assuming 'token' is the key for the token in the response
        
        const snackBarConfig: MatSnackBarConfig = {
          panelClass: ['custom-snackbar'],
          duration: 3000
        };
        if (res.roles === 'ADMIN') {
          this.matSnak.open('Login Success', 'Close', snackBarConfig);
          this.route.navigate(['admin', 'dashboard']);
        } else if (res.roles === 'USER') {
         
          
          this.matSnak.open('Login Success', 'Close', snackBarConfig);
          this.route.navigate(['user', 'dashboard']);
        } else {
          alert('Invalid user');
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;  // Get the error message from the response
        this.matSnak.open(`${this.errorMessage}`, 'Close', { duration: 3000 });
  
      }
    );
  }
  


 

}
