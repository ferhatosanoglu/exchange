import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../models';
import { ProductService } from '../../utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {

  constructor(
    private _productService: ProductService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,

    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  model: Wallet = new Wallet();

  ngOnInit(): void { }
  _productRenew: boolean = false;

  addProduct(productForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };
    productForm.value["UserId"] = this.data.UserId;
    productForm.value["State"] = false;
    if (productForm.valid) {
      this._translateService
        .get('Product registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      this._productService.addProduct(productForm.value);
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
