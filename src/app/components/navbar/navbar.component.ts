import { Component, OnInit } from '@angular/core';
import { ComponentsService } from '../service/components.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: User;

  constructor(private componentsService: ComponentsService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.componentsService.user()
      .subscribe({
        next: (response) => {
          this.user = response;
        }
      });

    this.user = this.componentsService.getUser();
  }

  onLogout(): void {
    this.componentsService.logout();
    this.router.navigateByUrl('/login');
  }

}
