
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { BuynowComponent } from './buynow/buynow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { TypeComponent } from './type/type.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    CartComponent,
    BuynowComponent,
    AboutComponent,
    ProductComponent,
    CategoryComponent,
    TypeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  
  ]
})
export class UserModule { }
