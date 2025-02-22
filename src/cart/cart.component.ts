import { Component, OnInit } from '@angular/core';
import { cartVM } from '../ViewModel/cartVM';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../Services/local-storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CartComponent implements OnInit {

  cart: cartVM[] = [];
  resetCart: cartVM[] = [];

  doneAction: boolean = false;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.cart = this.localStorageService.getItemFromLocalS() || [];
    this.localStorageService.storageChanges$.subscribe((updatedCart) => {
      this.cart = updatedCart;
    });
  }

  delete(id: number): void {

    this.localStorageService.removeItemFromLocalS(id);
  }

  done(id: number): void {

    this.localStorageService.doneItemFromLocalS(id);
  }

  undo(id: number): void {

    this.localStorageService.undoItemFromLocalS(id);
  }

  edit(id: number): void {

    this.resetCart = JSON.parse(JSON.stringify(this.cart));
    const selected = this.cart.find(item => item.id === id);
    if (selected) {
      selected.editMode = true;
    }
  }

  editDone(id: number): void {
    this.localStorageService.editItemFromLocalS(id);
    const selected = this.cart.find(item => item.id === id);
    if (selected) {
      selected.editMode = false;
    }
  }

  undoDone(id: number): void {

    this.cart = this.resetCart;
    this.localStorageService.setItemFromLocalS(this.cart);
    const selected = this.cart.find(item => item.id === id);
    if (selected) {
      selected.editMode = false;
    }
  }
}
