import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User, Wallet } from '../../models';
import { ProductService, UserService } from '../../utils';
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
    private _userService: UserService,
    private _translateService: TranslateService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  products!: Wallet[];
  user!: Array<User>;

  async ngOnInit() {
    this.products = <Array<Wallet>>await this._productService.listAdminAsync();
    this.user = <Array<User>>await this._userService.listAsync();
  }

  findUser(Id: number) {
    const temp = this.user.find(Name => Name.id == Id)
    return temp?.Name;
  }

  async confirmProduct(product: any) {
    let notification: any = {
      message: '',
      panelClass: '',
    };
    product.State = true;
    try {
      await this._productService.confirimProduct(product);
      this._translateService
        .get('Patient registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      this.products.splice(
        this.products.indexOf(product),
        1
      );
    } catch (error) {
      this._productService.errorNotification(error);
    }
    this._snackBar.open(notification.message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: notification.panelClass,
    });
  }

}
