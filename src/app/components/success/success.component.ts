import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ComponentsService } from '../service/components.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
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
}
