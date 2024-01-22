import {AdminRole} from "../enums/AdminRole";

export class AdminDTO{
  id:number
  name:string
  email:string
  password:string
  role:AdminRole
}
