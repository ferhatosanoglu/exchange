import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../utils';
import { MatDialog } from '@angular/material/dialog';
import {AddProductComponent,AddMoneyComponent} from '../../../components'
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private _languageService: LanguageService,
    private _dialog: MatDialog
  ) { }

  openAddProduct() {
    const diologRef = this._dialog.open(AddProductComponent, {
      width: '400px',
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }
  openAddMoney() {
    const diologRef = this._dialog.open(AddMoneyComponent, {
      width: '400px',
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }


  ngOnInit(): void {
  }
}
