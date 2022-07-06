import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  getUserDetails(): string | null {
    if (localStorage.getItem('userdata')) {
      return localStorage.getItem('userdata');
    } else {
      return null;
    }
  }

  setDataInLocalStorage(variableName: string, data: string): void {
    localStorage.setItem(variableName, data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
