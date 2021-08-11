import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  clientPrincipal$ = this.authService.clientPrincipal$;
  helloMessage$!: Observable<any>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  getHello(name:string) {
    this.helloMessage$ = this.authService.getHelloMessage(name);
  }

}
