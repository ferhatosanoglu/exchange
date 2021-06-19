import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  constructor(
    private _apiFetchService: ApiFetchService,
    private _http: HttpClient,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _router: Router
  ) { }


  requestAsync(
    method: string,
    path: string,
    data: object,
    getToken: boolean = false
  ) {
    return new Promise((resolve, reject) => {
      let config: object = {};
      if (data != null) Object.assign(config, { body: data });
      if (getToken)
        Object.assign(config, {
          headers: { token: JSON.parse(localStorage.getItem('currentUser')!).token },
        });

      this._http
        .request<any>(method, `https://finans.truncgil.com/v3/${path}`, config)
        .subscribe(
          (res) => resolve(res),
          (error) =>
            reject({
              status: error.status,
              message:
                error.error != undefined
                  ? error.error.message
                  : error.message,
            })
        );
    });
  }

  async listAsync() {
    return await this.requestAsync(
      'GET',
      'today.json',
      null!,
    );
  }

  async buy(id: number, Amount: number) {
    const product: any = await this._apiFetchService.requestAsync(
      'GET',
      `Markets/${id}`,
      null!
    );
  }
}
