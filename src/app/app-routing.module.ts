import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGE_URLS } from './core/constants/page-urls.const';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
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
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
