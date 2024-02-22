import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';


import {MatSnackBar} from '@angular/material/snack-bar';

import { Car } from 'src/app/car';
import { CarService } from 'src/app/car.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  showPassword: boolean = false;
  eyeIcon: string = 'fas fa-eye-slash'; 


  userDetails: Car[] = [];
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private ser: CarService, private route: Router,private matSnak:MatSnackBar) {
    this.registrationForm = this.createRegistrationForm();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.ser.getAllUser().subscribe((res) => {
      this.userDetails = res;
    
    })
  }

  createRegistrationForm(): FormGroup {
    return this.fb.group({
      name: new FormControl('', [Validators.required], [this.usernameExistsValidator()]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      gender: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    });
  }

  register() {
    const reg = this.registrationForm.value as Car;
    console.log(reg);
    this.ser.signup(reg).subscribe((res) => {
      this.ser.openSnackBarGreen("Registration Success");
      this.route.navigate(['user', 'login']);
    });
  }

  cancel() {
    this.route.navigate([""]);
  }

  usernameExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      const username = control.value;
      const isUsernameExists = this.userDetails.some(user => user.name === username);
      return Promise.resolve(isUsernameExists ? { usernameExists: true } : null);
    };
  }
 togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.eyeIcon = this.showPassword ? 'fas fa-eye' : 'fas fa-eye-slash';
  }
}
