import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { API_URLS } from 'src/app/core/constants/api-urls.const';
import { ILogin } from 'src/app/core/interface/api-body.interface';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RegisterComponent>,
    private httpServices: HttpService) 
    { }

  ngOnInit(): void {
  }

  user: ILogin = { userName: '', password: '' };

  onNoClick(): void {
    this.dialogRef.close();
  }

  register():void{
    let url = environment.USER_API + API_URLS.REGISTER;
    this.httpServices.post(url, this.user).subscribe(data => {
      this.dialogRef.close();
    })
  }
}
