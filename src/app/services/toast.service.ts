import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toast: ToastrService
  ) { }

  showMsgError(msg: string){
    this.toast.error(msg, undefined, {positionClass: 'toast-top-left'});
  }

  showMsgGood(msg: string){
    this.toast.success(msg, undefined, {positionClass: 'toast-top-left'});
  }

}
