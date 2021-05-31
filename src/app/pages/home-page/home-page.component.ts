import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from 'src/app/models/userModel';
import { HttpService } from 'src/app/services/http.service';

import { ToastService } from '../../services/toast.service';
import { RamDataService } from 'src/app/services/ram-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  users: UserModel[] = [];

  constructor(
    private httpService: HttpService,
    private toast: ToastService,
    private router: Router,
    private rData: RamDataService
  ) { }

  ngOnInit(): void {
    this.getInit();
  }

  getInit(){
    this.httpService.getUsers().subscribe(users => this.users = users);
  }

  delete(username: string){
    this.httpService.deleteUser(username).subscribe(data => {
      if(data.msg == 'deleted') {
        this.users = this.users.filter(usr => usr.username != username);
        this.toast.showMsgGood('Usuario eliminado correctamente');
      }
    });
  }

  edit(username: string){
    let usr = this.users.filter(usr => usr.username == username)
    this.rData.editUser = usr[0];
    this.router.navigate(['/createdit']);
  }

}
