import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from '../register-service.service';
import { UpdateNavbarService } from '../update-navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private data: RegisterServiceService, private router: Router, private navBarService: UpdateNavbarService) { }

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showError: boolean = false;

  ngOnInit() {
    this.navBarService.updateNavBar(true, '/register');
  }

  handleRegister() {
    var reqObj = {
      'fname': this.firstName,
      'lname': this.lastName,
      'email': this.email,
      'password': this.confirmPassword
    };
    //this.data.fireRequest(reqObj);
    if(this.firstName && this.lastName && this.email && this.password && this.confirmPassword) {
      this.showError = false;
      this.router.navigateByUrl('/form');
    }
    else {
      this.showError = true;
    }
  }

}
