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
    this.localStorageService.storageChanges$.subscribe((updatedCarts) => {
      this.carts = updatedCarts;
    });
  }

  addCart(): void {
    if (this.checkBusinessRole()) {
      let newCart = new cartVM();
      newCart.id = ++this.ids;
      this.ids = newCart.id
      newCart.workName = this.work;
      newCart.email = this.email;

      this.localStorageService.setItemFromLocalS([...this.carts, newCart]);

      this.work = '';
      this.email = '';
    }
  }

  checkBusinessRole(): boolean {
    return !(this.work.trim() === '' || this.email.trim() === '');
  }
}
