import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  clientPrincipal$: Observable<any>;

  constructor(private httpClient: HttpClient) {
    this.clientPrincipal$ = this.httpClient.get('/.auth/me');
  }

  getHelloMessage(name: string) {
    return this.httpClient.get(`/api/HelloWorld?name=${name}`);
  }
}
