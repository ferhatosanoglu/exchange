import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../models';
import { LanguageService, ProductService } from '../../utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {

  constructor(
    private _productServices: ProductService,
    private _languageService: LanguageService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  model: Wallet = new Wallet();

  ngOnInit(): void { }

  addProduct(productForm: NgForm) {
    productForm.value["UserId"] = this.data.UserId;
    productForm.value["state"] = false;
    if (productForm.valid) {
      this._productServices.addProduct(productForm.value);
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
