import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService, UserService, ProductService, MarketService } from '../../../utils';
import { MatDialog, MatDialogTitle } from '@angular/material/dialog';
import { AddProductComponent, AddMoneyComponent } from '../../../components';
import { User, Wallet } from '../../../models';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  constructor(
    private _productService: ProductService,
    private _languageService: LanguageService,
    private _dialog: MatDialog,
    private _userService: UserService,
    private _marketService: MarketService,
    private _activatedRoute: ActivatedRoute,
  ) { }
  user: User = new User;
  products!: Wallet[];
  Id = this._activatedRoute.snapshot.paramMap.get('Id');
  markets!: any;
  async ngOnInit() {
    this.products = <Array<Wallet>>await this._productService.findAsync(this.Id, true);
    this.user = <User>(await this._userService.findAsync(this.Id));
    this.markets = await this._marketService.listAsync()
  }
  openAddProduct() {
    const diologRef = this._dialog.open(AddProductComponent, {
      data: {
        UserId: this.Id
      },
      width: '400px',
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }
  openAddMoney() {
    const diologRef = this._dialog.open(AddMoneyComponent, {
      data: {
        UserId: this.Id
      },
      width: '400px',
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }



}
