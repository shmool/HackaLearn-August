import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  clientPrincipal$ = this.authService.clientPrincipal$;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
