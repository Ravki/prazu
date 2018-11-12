import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceService {

  constructor() { }

  isShow = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  displaySpinner(toShow) {
    this.isShow = toShow;
    this.change.emit(this.isShow);
  }
}
