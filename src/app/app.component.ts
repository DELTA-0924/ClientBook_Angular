import { Component, EventEmitter, OnInit } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { ClientRequest, ICLientResponse, IClientRequest } from './models/IClient';
import { ClientService } from './services/client-service';
import { PhoneService } from './services/phone-service';
import { IPhoneRequest, IPhoneResponse } from './models/IPhone';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClientcomponetComponent } from './components/clientcomponet/clientcomponet.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhoneComponent } from './components/phone/phone.component';
import { OldphoneComponent } from './components/oldphone/oldphone.component';
import { IOldphone } from './models/OldPhone';
import { error } from 'node:console';
import { delay } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,ClientcomponetComponent,CommonModule,PhoneComponent,FormsModule,OldphoneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[PhoneService,ClientService]
})
export class AppComponent implements OnInit{
  title = 'ClientBook';
  clients:ICLientResponse[]=[];
  oldphoneList:boolean=false;
  oldphones:IOldphone[]=[];
  client:IClientRequest={fullName:"",inn:"",dateOfBirth:new Date()};
  phone:IPhoneRequest={number:"",typeNumber:"",clientInn:""};
  phones:IPhoneResponse[]=[];
  createClient:boolean=false;
  createPhone:boolean=false;
  updateClient:boolean=false;
  updatePhone:boolean=false;
  clientList:boolean=false;
  phoneList:boolean=false;
  closeEvent=new EventEmitter()
  CloseDialog(){
      return this.closeEvent.emit()
  }
  constructor(private clientService:ClientService, private phoneService:PhoneService,private router:Router){

  }
  ngOnInit(): void {
      this.clientService.getlistClient().subscribe(clients=>{        
        this.clients=clients
        console.log(this.clients)
      },(error)=>{
        alert(error.message)
      })
      this.phoneService.getlistPhone().subscribe(phones=>{        
        this.phones=phones;
        console.log(this.phones)
      },(error)=>{
        alert(error.message)
      })
      this.phoneService.getOldPhones().subscribe(
        oldphones=>{
          
          this.oldphones=oldphones;
          console.log(this.oldphones)
        },(error)=>{
          alert(error.message)
        }
      )
  }
  CreateClientDialog():void{
    this.createPhone=false;
    this.oldphoneList=false;
    this.CloseDialog()
    this.createClient=!this.createClient;
  }
  CreatePhoneDialog():void{
    this.createClient=false;
    this.oldphoneList=false;
    this.CloseDialog()
    this.createPhone=!this.createPhone;
  }
  ClientList():void{
    this.phoneList=false;
    this.oldphoneList=false;
    this.clientList=!this.clientList;
  }

  OldPhonelist():void{
    this.clientList=false;
    this.phoneList=false;
    this.oldphoneList=!this.oldphoneList
  }
  ClientPhone():void{
    this.clientList=false;
    this.oldphoneList=false;
    this.phoneList=!this.phoneList;    
  }
  CreateClient(client:IClientRequest){    
    this.clientService.createClient(client).subscribe();    
    this.refreshPage();
  }
  CreatePhone(phone:IPhoneRequest){
    this.phoneService.createPhone(phone).subscribe();        
    this.refreshPage();
  }
  CloseAllDialogs(){
    this.createPhone=false;
    this.createClient=false;
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
