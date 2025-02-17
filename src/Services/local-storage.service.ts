import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartVM } from '../ViewModel/cartVM';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSubject = new BehaviorSubject<cartVM[]>(this.getItemFromLocalS());

  storageChanges$ = this.storageSubject.asObservable();

  constructor() { }

  removeItemFromLocalS(id: number): void {
    const all = this.getItemFromLocalS();
    const updatedItems = all.filter((itm: cartVM) => itm.id !== id);
    this.setItemFromLocalS(updatedItems);
  }

  setItemFromLocalS(cart: cartVM[]): void {
    localStorage.setItem("carts", JSON.stringify(cart));
    this.storageSubject.next(cart);
  }

  getItemFromLocalS(): cartVM[] {
    return JSON.parse(localStorage.getItem("carts") || "[]");
  }

  doneItemFromLocalS(id: number): void {
    const all = this.getItemFromLocalS();
    const donedItems = all.find(itm => itm.id == id);
    if (donedItems) {
      donedItems.doneAction = true;
    }
    this.setItemFromLocalS(all);
  }

  undoItemFromLocalS(id: number): void {
    const all = this.getItemFromLocalS();
    const donedItems = all.find(itm => itm.id == id);
    if (donedItems) {
      donedItems.doneAction = false;
    }
    this.setItemFromLocalS(all);
  }

  editItemFromLocalS(id: number): void {

  }
}
