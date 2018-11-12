import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SpinnerServiceService } from './spinner-service.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient, private router: Router, private spinnerService: SpinnerServiceService) { }

  fireRequest(requestObject) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'text/json' })
    };
    return this.http.post('http://localhost:8082/Automation/services/automation', requestObject, httpOptions).subscribe(result => {
        console.log("Result is:",result);
        this.spinnerService.displaySpinner(false);
        this.router.navigateByUrl('/');
      }, error => {console.log('There was an error: ');this.spinnerService.displaySpinner(false);});

  }
}
