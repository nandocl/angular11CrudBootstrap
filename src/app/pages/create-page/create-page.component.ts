import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserModel } from 'src/app/models/userModel';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from '../../services/toast.service';
import { RamDataService } from 'src/app/services/ram-data.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css']
})
export class CreatePageComponent implements OnInit, OnDestroy {

  newUserFlag: boolean = true;
  controls: any = {};
  usrId: string = '';
  keepPass: boolean = false;

  formGroup = new FormGroup({
    fullNameControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
    usernameControl: new FormControl('', [Validators.required,Validators.minLength(4)]),
    passwordControl: new FormControl({value:'', disabled: this.keepPass}, [Validators.required,Validators.minLength(4)]),
  });

  constructor(
    private httpService: HttpService,
    private toast: ToastService,
    private rData: RamDataService
  ) { }

  ngOnInit(): void {
    this.controls = this.formGroup.controls;
    let exist = this.rData.editUser;

    if(exist.id != ''){
      this.usrId = exist.id;
      this.newUserFlag = false;
      this.controls.fullNameControl.value = exist.full_name;
      this.controls.usernameControl.value = exist.username;
    }else this.keepPass = false;
  }

  userAction(){
    if(this.newUserFlag) this.sendUser();
    else this.updateUser();
  }

  sendUser(): void {
    const newUser = this.newUser();
    this.httpService.createUser(newUser).subscribe(data => {
      if(data.msg == 'created') this.toast.showMsgGood('Usuario creado correctamente');
      else if(data.msg == 'exists') this.toast.showMsgError('Este usuario ya existe.');
      this.formGroup.reset();
    });
  }

  updateUser(): void{
    const newUser = this.newUser();
    this.httpService.updateUser(newUser).subscribe(data => {
      if(data.msg == 'updated') this.toast.showMsgGood('Usuario actualizado correctamente');
      this.formGroup.reset();
    });
  }

  newUser(): UserModel {
    const fullname = this.controls.fullNameControl.value;
    const username = this.controls.usernameControl.value;
    const password = this.controls.passwordControl.value;
    return new UserModel(this.usrId, fullname, username, password);
  }

  disablePass(){
    this.keepPass = !this.keepPass;
    if(this.keepPass == false) this.controls.passwordControl.enable()
    else this.controls.passwordControl.disable()
  }

  ngOnDestroy(){
    this.rData.editUser = new UserModel('','','');
  }

}
