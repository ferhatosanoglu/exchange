import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private _apiFetchService: ApiFetchService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('User')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
  async login(user: any, path = '/') {
    const respone: any = await this._apiFetchService.requestAsync(
      'get',
      'Users',
      user
    );
    let Error: Number;
    respone.forEach((client: { Name: any; Password: any; }) => {
      if (user.Name == client.Name) {
        if (user.Password == client.Password) {
          localStorage.setItem('currentUser', JSON.stringify(respone));
          this.currentUserSubject.next(respone);
          this._router.navigateByUrl(path);
        } else {

        }
      }
    });
    return respone;
  }
  async tokenDecode() {
    try {
      if (this.currentUserValue) {
        return await this._apiFetchService.requestAsync(
          'GET',
          'token-decode',
          {},
          true
        );
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  async logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  }
}
