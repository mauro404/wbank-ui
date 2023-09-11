import { Component, OnDestroy } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { ComponentsService } from '../service/components.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest;

  constructor(private componentsService: ComponentsService,
    private router: Router) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void {
    this.componentsService.login(this.model)
      .subscribe({
        next: (response) => {
          this.componentsService.setUser({
            id: response.id,
          })

          this.router.navigateByUrl(`/user/${response.id}`);
        }
      })
  }
}
