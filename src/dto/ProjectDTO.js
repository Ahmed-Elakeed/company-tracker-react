import {ProjectStatus} from "../enums/ProjectStatus";

export class ProjectDTO{
    id:number
    name:string
    startDate:any
    endDate:any
    description:string
    status:ProjectStatus
    departmentId:number
    departmentName:string
}
