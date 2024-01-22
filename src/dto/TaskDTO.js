import {TaskStatus} from "../enums/TaskStatus";
export class TaskDTO{
    id:number
    name:string
    description:string
    startDate:any
    endDate:any
    status:TaskStatus
    projectName:string
    employeeName:string
    projectId: number;
    employeeId:number;
}