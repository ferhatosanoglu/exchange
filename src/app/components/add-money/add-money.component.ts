import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../models';
import { LanguageService, ProductService, MoneyService } from '../../utils';
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
    private _productService: ProductService,
    private _moneyService: MoneyService,
    private _languageService: LanguageService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private dialogRef: MatDialogRef<AddMoneyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  model: Wallet = new Wallet();
  rate!: any;
  rates!: any;
  _productRenew: boolean = false;
  async ngOnInit() {
    this.rate = await this._moneyService.listAsync();
    this.rates = Object.entries(this.rate);
    this.rates.shift();
    this.rates.length = 66;
  }

  addMoney(moneyForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };
    moneyForm.value.Name = moneyForm.value.Name.replace(/,/g, '.');
    moneyForm.value.Amount = moneyForm.value.Amount * moneyForm.value.Name;
    moneyForm.value["UserId"] = this.data.UserId;
    moneyForm.value.Name = "tl";
    moneyForm.value["State"] = false;
    if (moneyForm.valid) {
      this._translateService
        .get('Money registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      this._productService.addProduct(moneyForm.value);
      this.dialogRef.close(this._productRenew);
    } else {
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__error';
    }
    this._snackBar.open(notification.message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: notification.panelClass,
    });
  }
}
