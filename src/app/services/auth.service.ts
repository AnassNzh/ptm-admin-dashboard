import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.baseUrl + '/auth/login';
  private logoutUrl = environment.baseUrl + '/auth/logout';
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    console.log('login service called')
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.loginUrl, {email, password}, {headers})
      .pipe(
        tap(response => {
          console.log('login response auth', response);
          if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    // Optionally, call the logout API to invalidate the session
    // this.http.post(this.logoutUrl, {}).subscribe();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
