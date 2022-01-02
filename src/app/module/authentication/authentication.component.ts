import { Component, OnInit } from '@angular/core';
import { ILogin } from 'src/app/core/interface/api-body.interface';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  user : ILogin = {userName: 'ss', password:'ss'};

  constructor() { }

  ngOnInit(): void {
  }

  login() : void {

  }
}
