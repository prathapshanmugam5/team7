import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
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


  goBack() {
    this.route.navigate(['user', 'dashboard']);
  }


  constructor(private auth: ProductService, private route: Router, private cart: CartService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {

    this.userDetails();

    this.getByIdDetails();

  }


  user: any;
  carts: Cart[];
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

  getByIdDetails() {
    this.cart.getCartById(this.user.id).subscribe((res) => {
      console.log(res);
      this.carts = res;
      this.removeDuplicates();
    })

  }

  //Remove Duplicate Values
  removeDuplicates() {

    const unique = this.carts.filter((obj, index) => {
      return index === this.carts.findIndex(o => obj.productId === o.productId)
    });

    console.log(unique);
    this.DuplicateRemovedCart = unique;
    this.getProductDetails();

  }


  //Get DuplicateRemovedCart Products
  getProductDetails() {

    for (let i in this.DuplicateRemovedCart) {
      this.auth.getProductById(this.DuplicateRemovedCart[i].productId).subscribe((res) => {
        this.ProductDetails.push(res);
        this.total += res.price;
        console.log(this.ProductDetails);

      })
    }
  }
  logout() {
    if (confirm('Confirm Logout')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.route.navigate(['']); // Navigate to a specific route after logout
    } else {
      location.reload(); // Reload the page if confirmation is canceled
    }
  }

  gotoCartPage() {
    this.route.navigate(['user', 'cart']);

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
