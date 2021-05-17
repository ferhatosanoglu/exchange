import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ClientLayoutComponent
} from './components/layouts';
import {
  HomepageComponent,
  ClientLoginComponent,
  AdminComponent
} from './pages';

const routes: Routes = [
  {
    path: 'home',
    component: ClientLayoutComponent,
    children: [
      {
        path: ':Id',
        component: HomepageComponent,
        data: { title: 'Exchange' }
      }
    ]
  },
  {
    path: "admin",
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: AdminComponent,
        data: { title: 'Admin' }
      }
    ]
  },
  {
    path: '',
    component: ClientLoginComponent,
    data: { title: 'Login' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [ClientLayoutComponent];
