import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../utils'
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private _languageService: LanguageService,
  ) { }



  ngOnInit(): void {
  }
}
