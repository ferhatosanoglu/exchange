import { Component, OnInit } from '@angular/core';
import { User } from '../../../models';
import { NgForm } from '@angular/forms';
import { LanguageService } from '../../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent implements OnInit {

  constructor(
    private _languageService: LanguageService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) { }

  model: User = new User();

  ngOnInit(): void { }

  useLanguage(language: string) {
    this._languageService.setLanguage(language);
  }

}
