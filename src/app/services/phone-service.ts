import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPhoneRequest, IPhoneResponse } from "../models/IPhone";
import { Observable, catchError, throwError } from "rxjs";
import { IOldphone } from "../models/OldPhone";

@Injectable({
    providedIn:'root'
})
export class PhoneService{
    private url="http://localhost:8080/api/v1/phone"
    private HeaderJson=new HttpHeaders().set("Content-Type","application/json")
    constructor(private httpclient:HttpClient){

    }
    getlistPhone():Observable<IPhoneResponse[]>{
        return this.httpclient.get<IPhoneResponse[]>(`${this.url}/list`);
    }
    createPhone(phone:IPhoneRequest){
        const phoneJson=JSON.stringify(phone)
        return this.httpclient.post(`${this.url}/create`,phoneJson,{headers:this.HeaderJson}).pipe(catchError((err)=>{
            alert(err["error"]["message"])
            return throwError(err)
        }));
    }
    deletePhone(id:number){
        const params=new HttpParams().set("id",id)
        console.log(params)
        return this.httpclient .delete(`${this.url}/delete`,{params}).pipe(catchError((err)=>{
            alert(err["error"]["message"]);
            return throwError(err);
        }))       ;
    }
    updatePhone(phone:string,id:number){
        const phoneJson=JSON.stringify(phone);
        const params=new HttpParams().set("id",id)
                                    .set("phone",phone)
        return this.httpclient.put(`${this.url}/update`,phoneJson,{params}).pipe(catchError((err)=>{
            alert(err["error"]["message"]);
            return throwError(err);
        }))       ;
    }
    getOldPhones():Observable<IOldphone[]>{
        return this.httpclient.get<IOldphone[]>(`${this.url}/oldphone`).pipe(catchError((err)=>{
            alert(err["error"]["message"]);
            return throwError(err);
        }))       ;
    }
}
