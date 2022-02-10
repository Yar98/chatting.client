import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share/share.module';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
