import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateNavbarService {

  constructor() { }

  isRoot = true;
  component = '';
  @Output() updateNav: EventEmitter<object> = new EventEmitter();

  updateNavBar(isRoot, component) {
    this.isRoot = isRoot;
    this.component = component;
    this.updateNav.emit({isRoot: this.isRoot, name: this.component});
  }
}
