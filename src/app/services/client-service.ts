import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { ICLientResponse, IClientRequest } from "../models/IClient";

@Injectable({
    providedIn:'root'
})
export class ClientService{
    private url="http://localhost:8080/api/v1/client";
    private HeaderJson=new HttpHeaders().set("Content-Type","application/json")
    
    constructor(private httpclient:HttpClient){

    }
    getlistClient():Observable<ICLientResponse[]>{
        return this.httpclient.get<ICLientResponse[]>(`${this.url}/list`);
    }
    createClient(client:IClientRequest) {
        const clientJson=JSON.stringify(client);
        console.log(clientJson)
        return this.httpclient.post(`${this.url}/create`,clientJson,{headers:this.HeaderJson}).pipe(catchError((err)=>{
            alert(err["error"]["message"])
            return throwError(err)
        }))       
    }
    deteteClientByInn(innStr:string):void{                             
        const innJson=JSON.stringify(innStr);
        this.httpclient.post(`${this.url}/delete`,innJson).pipe(catchError((err)=>{
            alert(err["error"]["message"])
            return throwError(err);
        }))
    }
    updateClient(client:IClientRequest):void{
        const clientJson=JSON.stringify(client);
        this.httpclient.post(`${this.url}/update`,clientJson,{headers:this.HeaderJson}).pipe(catchError((err)=>
        {
            alert(err["error"]["message"])
            return throwError(err);
        }))
    }
}