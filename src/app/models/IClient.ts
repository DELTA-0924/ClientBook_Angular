export interface ICLientResponse{
    id:number;
    fullName:string;
    inn:string;
    dateOfBirth:Date;
    createdDate:Date;
}
export class ClientResponse{
    id=1;
    fullName="Unknown";
    inn="123456787654";
    dateofBirth=Date.now;
    createdDate=Date.now;
}
export interface IClientRequest{
    fullName:string;
    inn:string;
    dateOfBirth:Date;
}
export class ClientRequest {
    fullName="";
    inn="";
    dateofBirth=Date.now;
}
