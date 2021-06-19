import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Wallet } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _apiFetchService: ApiFetchService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _router: Router
  ) { }
  temp!: Wallet[];
  async addProduct(values: any) {
    this.temp = <Array<Wallet>>await this._apiFetchService.requestAsync(
      'GET',
      `Wallet?UserId=${values.UserId}&State=false&Name=${values.Name}`,
      null!
    );
    if (this.temp[0]) {
      this.temp[0].Amount += values.Amount;
      console.log(this.temp[0]);
      this.updateAsync(this.temp[0]);
    } else {
      return await this._apiFetchService.requestAsync(
        'POST',
        'Wallet',
        values
      );
    }
  }
  async confirimProduct(values: any) {
    this.temp = <Array<Wallet>>await this._apiFetchService.requestAsync(
      'GET',
      `Wallet?UserId=${values.UserId}&State=true&Name=${values.Name}`,
      null!
    );
    if (this.temp[0]) {
      this.temp[0].Amount += values.Amount;
      this.updateAsync(this.temp[0]);
      this.deleteAsync(values);
    } else {
      this.updateAsync(values);
    }
  }

  async deleteAsync(values: any) {
    return await this._apiFetchService.requestAsync(
      'DELETE',
      `Wallet/${values.id}`,
      null!,
      true
    );
  }

  async updateAsync(values: any) {
    return await this._apiFetchService.requestAsync(
      'PUT',
      `Wallet/${values.id}`,
      values,
      null!
    );
  }

  async findAsync(Id: any, State: boolean) {
    return await this._apiFetchService.requestAsync(
      'GET',
      `Wallet?UserId=${Id}&State=${State}`,
      null!
    );
  }
  async listAdminAsync() {
    return await this._apiFetchService.requestAsync(
      'GET',
      `Wallet?State=false`,
      null!
    );
  }

  async listAsync() {
    return await this._apiFetchService.requestAsync(
      'GET',
      'Wallet',
      null!
    );
  }

  errorNotification(error: any) {
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