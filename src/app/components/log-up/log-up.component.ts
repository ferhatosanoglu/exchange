import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../utils';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-up',
  templateUrl: './log-up.component.html',
  styleUrls: ['./log-up.component.scss']
})
export class LogUpComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    public _router: Router,
  ) { }
  _model: User = new User();
  disableButton: boolean = false;

  async ngOnInit() {
    this.insertActionAsync;
  }
  async insertActionAsync(userForm: NgForm) {
    try {
      this.disableButton = true;
      await this._userService.insertAsync(userForm.value);
      userForm.resetForm();
      return true;
    } catch (error) {
      this.disableButton = false;
      this._userService.errorNotification(error);
      return false;
    }
  }
}
