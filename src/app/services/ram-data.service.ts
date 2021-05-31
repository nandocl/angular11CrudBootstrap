import { Injectable } from '@angular/core';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class RamDataService {

  constructor() { }

  private _editUser: UserModel = new UserModel('', '', '');

  set editUser(user: UserModel){
    this._editUser = user;
  }

  get editUser(): UserModel{
    return this._editUser;
  }
}
