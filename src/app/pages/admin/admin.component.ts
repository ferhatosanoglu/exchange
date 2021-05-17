import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Wallet } from '../../models';
import { ProductService } from '../../utils';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private _productService: ProductService,
    private _translateService: TranslateService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  products!: Wallet[];

  async ngOnInit() {
    this.products = <Array<Wallet>>await this._productService.listAsync()
  }
  confirmProduct(product: object) {
    console.log(product);
    this._productService.confirmProduct(product);
    this.ngOnInit();
  }
}
