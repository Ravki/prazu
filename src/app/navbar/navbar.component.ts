import { Component, OnInit } from '@angular/core';
import { UpdateNavbarService } from '../update-navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private navBarService: UpdateNavbarService) { }

  isRoot: boolean = true;
  currentUrl: string = '/';

  ngOnInit() {
    this.navBarService.updateNav.subscribe(data => {
      this.isRoot = data.isRoot;
      this.currentUrl = data.name;
    });
  }

}
