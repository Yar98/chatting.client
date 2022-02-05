import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenGuard } from './core/guards/authen.guard';
import { PAGE_URLS } from './core/constants/page-urls.const';

const routes: Routes = [
  { path: '', redirectTo: PAGE_URLS.AUTH, pathMatch: 'full' },
  {
    path: PAGE_URLS.AUTH,
    loadChildren: () =>
      import('./module/authentication/authentication.module').then(
        (mod) => mod.AuthenticationModule
      )
  },
  {
    path: PAGE_URLS.CHAT,
    loadChildren: () =>
      import('./module/chat/chat.module').then(
        (mod) => mod.ChatModule
      ),
    //canActivate: [AuthenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
