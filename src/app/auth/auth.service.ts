import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  clientPrincipal$: BehaviorSubject<any> = new BehaviorSubject({clientPrincipal: 'pending'});

  constructor(private httpClient: HttpClient) {
    this.getUser();
  }

  getUser() {
    this.httpClient.get('/.auth/me').subscribe(user => this.clientPrincipal$.next(user));
  }

  getHelloMessage(name: string) {
    return this.httpClient.get(`/api/HelloWorld?name=${name}`);
  }
}
