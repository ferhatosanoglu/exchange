import { Component, OnInit } from '@angular/core';
import { LanguageService, AuthService } from '../../../../utils';
import { MatDialog } from '@angular/material/dialog';
import { from } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private _languageService: LanguageService,
    private _authService: AuthService,
    private _dialog: MatDialog
  ) { }

  // userInformation= this._authService.currentUserValue.result;
  lang: string =
    this._languageService.getLanguage() == 'en'
      ? 'us'
      : this._languageService.getLanguage() || 'tr';
  ngOnInit(): void { }

  setLang(lang: string) {
    this.lang = lang == 'en' ? 'us' : lang;
    this._languageService.setLanguage(lang);
  }

  async signout() {
    await this._authService.logout();
  }
}
