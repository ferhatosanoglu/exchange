import { Component, OnInit } from '@angular/core';
import { LanguageService, UserService } from '../../utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
  ) { }
  _model: User = new User();

  ngOnInit(): void {
  }
  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      this._userService.login(loginForm.value);
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
