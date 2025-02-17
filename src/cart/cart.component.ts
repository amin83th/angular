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

  doneAction: boolean = false;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
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
    const selected = this.cart.find(item => item.id === id);
    if (selected) {
      selected.editMode = true;
    }
  }

  editDone(id: number): void {

    this.localStorageService.editItemFromLocalS(id);
  }

  undoDone(id: number): void {
    const selected = this.cart.find(item => item.id === id);
    if (selected) {
      selected.editMode = false;
    }
  }
}
