import { NgModule } from '@angular/core';
import { MatModule } from './utils';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LogUpComponent, LogInComponent } from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ClientLoginComponent, HomepageComponent
} from './pages';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/layouts/client/header/header.component';
import { WalletComponent } from './components/wallet/wallet.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ClientLoginComponent,
    LogInComponent,
    LogUpComponent,
    CardComponent,
    HeaderComponent,
    HomepageComponent,
    WalletComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatModule,
    MatSnackBarModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
