import { Component, OnInit } from '@angular/core';
import { cartVM } from '../ViewModel/cartVM';
import { FormsModule } from '@angular/forms';
import { CartComponent } from "../cart/cart.component";
import { LocalStorageService } from '../Services/local-storage.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CartComponent],
  templateUrl: './app.component.html',
  standalone: true,
})
export class AppComponent implements OnInit {

  cartVMs: cartVM = new cartVM();
  carts: cartVM[] = [];

  work: string = '';
  email: string = '';
  ids: number = 0;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.carts = this.localStorageService.getItemFromLocalS() || [];
    this.localStorageService.storageChanges$.subscribe((updatedCarts) => {
      this.carts = updatedCarts;
    });

    this.ids = Number(localStorage.getItem('cart_ids')) || 0;
  }


  addCart(): void {
    if (this.checkBusinessRole()) {
      let newCart = new cartVM();
      newCart.id = this.ids + 1;
      this.ids = newCart.id;
      newCart.workName = this.work;
      newCart.email = this.email;

      this.localStorageService.setItemFromLocalS([...this.carts, newCart]);
      localStorage.setItem('cart_ids', this.ids.toString());

      this.work = '';
      this.email = '';
    }
  }

  checkBusinessRole(): boolean {
    return !(this.work.trim() === '' || this.email.trim() === '');
  }
}
