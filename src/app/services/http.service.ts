import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/userModel';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  usersEndPoint: string = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
  ) { }

  public getUsers(){
    return this.http.get<UserInterface>(this.usersEndPoint).pipe(
      map(users => {
        return users.data.map(user => UserModel.fromJson(user));
      })
    );
  }

  public createUser(newUser: UserModel){
    return this.http.post<UserInterface>(this.usersEndPoint, newUser.toJson(newUser));
  }

  public updateUser(updateUser: UserModel){
    return this.http.put<UserInterface>(this.usersEndPoint, updateUser.toJson(updateUser));
  }

  public deleteUser(username: string){
    let options = new HttpParams().set('username', username);
    return this.http.delete<UserInterface>(this.usersEndPoint, {params: options});
  }

}
