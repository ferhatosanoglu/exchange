import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils';
import {
  ClientLayoutComponent
} from './components/layouts';
import {
  HomepageComponent,
  ClientLoginComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
    ]
  },
  {
    path: 'login',
    component: ClientLoginComponent,
    data: { title: 'Login' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [ClientLayoutComponent];
