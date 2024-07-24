import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPhoneResponse } from '../../models/IPhone';
import { PhoneService } from '../../services/phone-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css',
  providers:[PhoneService]
})
export class PhoneComponent implements OnInit{
  @Input() phone:IPhoneResponse;
  @Input() closeDialog: EventEmitter<void>;
  @Output() CloseDialogsEvent=new EventEmitter<boolean>();
  id:number=0;
  Updatephone:string;
  updateFlag=false;
  ngOnInit() {
    if (this.closeDialog) {
      this.closeDialog.subscribe(() => {
        this.CloseDialog();
      });
    }
  }
  constructor(private phoneService:PhoneService,private router:Router){

    
  }
  

  DeletePhone(id:number){
    this.phoneService.deletePhone(id).subscribe()
    this.refreshPage()
    }
  UpdateFlag():void{
    this.updateFlag=!this.updateFlag;
    this.CloseDialogsEvent.emit(false);
  }
  UpdatePhone(phone:string,id:number){
    this.phoneService.updatePhone(phone,id).subscribe()
    this.refreshPage()
  }
   CloseDialog(){
    this.updateFlag=false;
    return 0;
  }
  refreshPage() {
    this.router.navigate([this.router.url])
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 3000); // задержка в 3000 миллисекунд (3 секунды)
      });
    }
}
