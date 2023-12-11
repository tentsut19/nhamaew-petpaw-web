import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { map, retry, catchError, timeout } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  validateUser(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    headers = headers.set("Authorization", "Bearer " + localStorage.getItem("access_token"));
    this.httpOptions.headers = headers;
    return this.http.get(environment.api_endpoint + "/auth/user/" + id , this.httpOptions);
  }

  loginX(username: string, password: string): Observable<any> {
    let param = {'username':username,'password':password};
    return this.http.post<any>(environment.api_endpoint + '/auth/login', param , this.httpOptions);
  }

  login(username: string, password: string) {
    // post to fake back end, this url will be handled there...

    return this.http
      .post<any>(environment.api_endpoint + '/auth/login', { username, password })
      .pipe(
        map(data => {
          console.log(data)
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          data.authdata = window.btoa(data.data.token);
          localStorage.setItem("accessToken", data.data.token);
          localStorage.setItem("userId", data.data.id);
          localStorage.setItem("name", data.data.name);

          // window.location.href = "/";
          this.currentUserSubject.next(data.data);
          return data;
        })
      );
  }

  handleError(error) {
    console.log(error);
    let errorMessage = '';
    if(error.error && error.error.data) {
      errorMessage = error.error.data.error_message;
    }
    return throwError(errorMessage);
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
