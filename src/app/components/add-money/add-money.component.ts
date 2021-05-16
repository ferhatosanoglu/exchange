import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../models';
import { LanguageService, ProductService } from '../../utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss']
})

export class AddMoneyComponent implements OnInit {

  constructor(
    private _productServices: ProductService,
    private _languageService: LanguageService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  model: Wallet = new Wallet();

  ngOnInit(): void { }

  addMoney(moneyForm: NgForm) {
    moneyForm.value["UserId"] = this.data.UserId;
    moneyForm.value["Name"] = "tl";
    moneyForm.value["state"] = false;
    if (moneyForm.valid) {
      this._productServices.addProduct(moneyForm.value);
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
