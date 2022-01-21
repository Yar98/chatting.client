import { Injectable } from '@angular/core';
import { STORAGE_MANAGER } from '../constants/storage.const';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getAccessToken(): string {
    let token = sessionStorage.getItem(STORAGE_MANAGER.TOKEN);
    if (!token) {
      token = localStorage.getItem(STORAGE_MANAGER.TOKEN);
    }
    return token || '';
  }

  setAccessToken(accessToken: string, isRemember: boolean): void {
    if (isRemember)
      localStorage.setItem(STORAGE_MANAGER.TOKEN, accessToken);
    else
      sessionStorage.setItem(STORAGE_MANAGER.TOKEN, accessToken);
  }

  clearStorage(){
    localStorage.clear();
    sessionStorage.clear();
  }

}
