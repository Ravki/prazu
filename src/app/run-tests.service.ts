import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SpinnerServiceService } from './spinner-service.service';

@Injectable({
  providedIn: 'root'
})
export class RunTestsService {

  constructor(private http: HttpClient, private router: Router, private spinnerService: SpinnerServiceService) {}

  chartData: any = {};

  postDetails(requestObject) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/Json' })
    };
    return this.http.post('http://localhost:40506/api/values', requestObject, httpOptions).subscribe(result => {
        console.log("Result is:",result);
        this.chartData = result;
        this.spinnerService.displaySpinner(false);
        this.router.navigateByUrl('/results');
      }, error => {console.log('There was an error: ');
        this.spinnerService.displaySpinner(false);
        this.chartData =  {
          success: true,
          summaryChart: [{"value":1,"label":"Pass"},{"value":1,"label":"Fail"}], 
          drillDownChart: [
            {"Module":"Gmail","Test Cases Executed":"2","TestCasesPassed":"1","TestCasesFailed":"1","ExecutionTime":"00:00:07"}
          ]
        };
        this.router.navigateByUrl('/results');
      });
  }
}
