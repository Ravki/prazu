import { Component } from '@angular/core';
import { SpinnerServiceService } from './spinner-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private spinnerService: SpinnerServiceService) { }

  hideSpinner: boolean = true;

  ngOnInit() {
    this.spinnerService.change.subscribe(showSpinner => {
      this.hideSpinner = !showSpinner;
    });
  }

}
