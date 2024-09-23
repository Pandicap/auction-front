import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  sideNavInfo: boolean = false;
  userFullName: string = ''

  constructor(private router: Router, private authService: AuthService,) {
    this.authService.getCurrentUser().subscribe((res: any) => {
      this.userFullName = `${res.firstName} ${res.lastName}`;
    })
  }

  logout() {
    this.router.navigate(['/']);
  }
}
