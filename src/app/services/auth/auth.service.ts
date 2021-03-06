import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, httpOptions} from '../../config/config';
import {User} from '../../dto/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    return this.http.post(BASE_URL + 'auth/signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(BASE_URL + 'auth/signup', user);
  }

  loadAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(BASE_URL + 'auth/get-all');
  }

}
