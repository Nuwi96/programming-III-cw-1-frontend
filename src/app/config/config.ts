import {HttpHeaders} from '@angular/common/http';

export const BASE_URL = 'http://localhost:8080/api/v1/';

export const TOKEN_KEY = 'auth-token';
export const USER_KEY = 'auth-user';

export const TOKEN_HEADER_KEY = 'Authorization';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
