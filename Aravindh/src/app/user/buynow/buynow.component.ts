import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/cart';
import { CartService } from 'src/app/cart.service';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-buynow',
  templateUrl: './buynow.component.html',
  styleUrls: ['./buynow.component.scss']
})
export class BuynowComponent {
onSubmit() {

  console.log("Hello");
  this.route.navigate(['user', 'dashboard']);

}



  goBack() {
    this.route.navigate(['user', 'dashboard']);
  }



  user: any;
  carts: Product;
  DuplicateRemovedCart: Cart[];
  ProductDetails: Product[] = [];


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




  id: number;
  orderForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: ProductService,
    private route: Router,
    private cart: CartService,
    private cdr: ChangeDetectorRef,
    private act: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.act.snapshot.params['id']; // Initialize id here
    console.log(this.id);
    this.userDetails();

    this.getByIdDetails(); // Call getByIdDetails after id is initialized

    this.orderForm = this.formBuilder.group({
      quantity: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required]
    });
  }

  getByIdDetails() {
    console.log(this.id);

    this.auth.getProductById(this.id).subscribe((res) => {
      console.log(res);
      this.carts = res;
    });
  }



  //Get DuplicateRemovedCart Products
 
  logout() {
    if (confirm('Confirm Logout')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.route.navigate(['']); // Navigate to a specific route after logout
    } else {
      location.reload(); // Reload the page if confirmation is canceled
    }
  }


  gotoBuyNow(id: number) {
    this.route.navigate(['user', 'buynow']);

  }




  deleteCart(productId: number) {

    this.cart.deleteCart(productId, this.user.id).subscribe((res) => {
      location.reload();
    })
  }

  total = 0;



}
