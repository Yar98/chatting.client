import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {
    path: 'authen',
    loadChildren: () => 
      import('./module/authentication/authentication.module').then(
        (mod) => mod.AuthenticationModule
      )
  },
  {
    path: 'chat',
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
