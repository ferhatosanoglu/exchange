import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../models';
import { LanguageService, MarketService } from '../../utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})

export class BuyComponent implements OnInit {

  constructor(
    private _marketServices: MarketService,
    private _languageService: LanguageService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  model: Wallet = new Wallet();

  ngOnInit(): void { }

  Buy(buyForm: NgForm) {
    if (buyForm.valid) {
      this._marketServices.buy(this.data.id, buyForm.value.Amount);
    } else {
      let errorMessage: string;
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (errorMessage = value));
      this._snackBar.open(errorMessage!, 'X', {
        duration: 3000,
        panelClass: 'notification__error',
      });
    }
  }
}
