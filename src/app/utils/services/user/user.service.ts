import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private _apiFetchService: ApiFetchService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _router: Router
  ) { }
  async listAsync() {
    return await this._apiFetchService.requestAsync(
      'GET',
      'Users',
      null!,
    );
  }
  async login(_user: any) {
    try {
      const user: any = await this._apiFetchService.requestAsync(
        'Get',
        `Users?Username=${_user.Username}`,
        null!
      )
      if (user[0].Password == _user.Password) {
        this._router.navigateByUrl(`home/${user[0].id}`);
      } else {
        let errorMessage: string;
        this._translateService
          .get('Your active password does not match !')
          .subscribe((value) => (errorMessage = value));
        this._snackBar.open(errorMessage!, 'X', {
          duration: 3000,
          panelClass: 'notification__error',
        });
      }
      return user;
    } catch (error) {
      let errorMessage: string;
      switch (error.status) {
        case 417:
          this._translateService
            .get('Please enter correct user information !')
            .subscribe((value) => (errorMessage = value));
          break;
        default:
          this._translateService
            .get(
              'No such user found !'
            )
            .subscribe((value) => (errorMessage = value));
          break;
      }
      this._snackBar.open(errorMessage!, 'X', {
        duration: 3000,
        panelClass: 'notification__error',
      });
    }
  }

  async deleteAsync(values: any) {
    return await this._apiFetchService.requestAsync(
      'DELETE',
      'Users',
      values,
      true
    );
  }

  async findAsync(Id: any) {
    return await this._apiFetchService.requestAsync(
      'GET',
      `Users/${Id}`,
      null!
    );
  }

  async insertAsync(values: object) {
    return await this._apiFetchService.requestAsync(
      'POST',
      'Users',
      values
    );
  }

  errorNotification(error: { status: any; }) {
    let errorMessage: string;
    switch (error.status) {
      default:
        this._translateService
          .get(
            'Server error occurred, please try again later If the error persists, we ask you to report this to the authorities'
          )
          .subscribe((value) => (errorMessage = value));
        break;
    }
    this._snackBar.open(errorMessage!, 'X', {
      duration: 4000,
      panelClass: 'notification__error',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
