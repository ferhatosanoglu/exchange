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
    public _router: Router
  ) { }
  _model: User = new User();
  _patientRenew: boolean = false;
  _action!: Function;
  async ngOnInit() { }


  async onSave(logupForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };
    if (logupForm.valid) {
      try {
        await this._userService.insertAsync(logupForm.value);
        logupForm.resetForm();
        this._translateService
          .get('User registration completed')
          .subscribe((value) => (notification.message = value));
        notification.panelClass = 'notification__success';
        this._patientRenew = true;
      } catch (error) {
        this._userService.errorNotification(error);
      }
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