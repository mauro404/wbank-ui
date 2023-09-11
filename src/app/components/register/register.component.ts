import { Component, OnDestroy } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { ComponentsService } from '../service/components.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: RegisterRequest

  constructor(private componentsService: ComponentsService,
    private router: Router) {
    this.model = {
      name: '',
      email: '',
      password: ''
    }
  }

  onFormSubmit() {
    this.componentsService.register(this.model)
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
