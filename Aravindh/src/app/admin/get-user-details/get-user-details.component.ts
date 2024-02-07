import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/car';
import { CarService } from 'src/app/car.service';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-get-user-details',
  templateUrl: './get-user-details.component.html',
  styleUrls: ['./get-user-details.component.scss']
})
export class GetUserDetailsComponent {




  Roles: Car = {
    roles: '',
    id: 0,
    name: '',
    password: '',
    age: 0,
    mobile: 0,
    gender: ''
  }; // Initialize it with an empty string or default value

  AllUserDetails:Car[]=[];
  constructor(private route: Router, private auth: ProductService, private ser: ProductService,private car:CarService) { }

  ngOnInit(): void {

    this.userDetails();
    this.getAllUserDetails();

  }

  getAllUserDetails(){
    this.car.getAllUser().subscribe((res)=>{
    this.AllUserDetails=res;
    console.log(this.AllUserDetails);
    
    })
  }





  user: any;

  userDetails() {
    // Retrieve user details from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      console.log(this.user);
    } else {
      // Handle the case when user details are not found in localStorage
    }
  }


 


  backToDashboard() {

    this.route.navigate(['admin','dashboard']);

  }

  toggleUserRole(event: any, index: number,id:number) {
    const checked = event.target.checked;
    
    
    if (checked) {
      this.Roles.roles="ADMIN"
        this.car.updateRoles(id,this.Roles).subscribe((res)=>{
          location.reload();
        })
    } else {
      this.Roles.roles="USER"
      this.car.updateRoles(id,this.Roles).subscribe((res)=>{
        location.reload();
      })
    }
}






}
