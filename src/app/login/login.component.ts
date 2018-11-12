import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { SpinnerServiceService } from '../spinner-service.service';
import { UpdateNavbarService } from '../update-navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private data: LoginServiceService, private spinnerService: SpinnerServiceService, private router: Router, private navBarService: UpdateNavbarService) { }

  userName: string = '';
  password: string = '';
  showError: boolean = false;
  

  ngOnInit() {
    this.navBarService.updateNavBar(true, '/');
  }

  handleLogin() {
      var reqObj = {
        'username': this.userName,
        'password': this.password
      };
      //this.spinnerService.displaySpinner(true);
      //this.data.fireRequest(reqObj);
      this.mockLoginValidation();
    }
    mockLoginValidation() {
      if(this.userName === 'user' && this.password === 'password') {
        this.showError = false;
        this.router.navigateByUrl('/form');
        //this.spinnerService.displaySpinner(false);
      }
      else {
        this.showError = true;
      }
    }

  }
