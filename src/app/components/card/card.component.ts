import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuyComponent } from '../../components';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
  ) { }

  @Input() market!: any;
  ngOnInit() {
  }
  openBuy() {
    const diologRef = this._dialog.open(BuyComponent, {
      data: {
        id: this.market.id
      },
      width: '400px',
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }
}
