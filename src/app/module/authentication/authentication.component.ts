import { Component, OnInit } from '@angular/core';
import { ILogin } from 'src/app/core/interface/api-body.interface';
import { HttpService } from 'src/app/core/services/http.service';
import { API_URLS } from 'src/app/core/constants/api-urls.const';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { PAGE_URLS } from 'src/app/core/constants/page-urls.const';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  user: ILogin = { userName: 'yarito', password: 'yarito' };

  constructor(private httpServices: HttpService,
    private storageService: StorageService,
    private router: Router) 
    { 
      this.httpServices.urlService = environment.USER_API;
    }

  ngOnInit(): void {
  }

  login(): void {
    let url = API_URLS.LOGIN;
    this.httpServices.post(url, this.user).subscribe(res => {
      let token = res.headers.get('token');
      console.log(res.headers);
      this.storageService.setAccessToken(token, false);
      this.router.navigate(['chat']);
    });
  }
}
