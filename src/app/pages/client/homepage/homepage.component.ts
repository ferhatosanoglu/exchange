import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService, UserService } from '../../../utils';
import { MatDialog, MatDialogTitle } from '@angular/material/dialog';
import { AddProductComponent, AddMoneyComponent } from '../../../components';
import { User } from '../../../models';
import { Identifiers } from '@angular/compiler';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private _languageService: LanguageService,
    private _dialog: MatDialog,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
  ) { }
  user: User = new User;
  Id = this._activatedRoute.snapshot.paramMap.get('Id');

  async ngOnInit() {
    this.user = <User>(
      await this._userService.findAsync(this.Id)
    );
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
