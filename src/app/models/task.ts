import { Checklist } from 'src/app/models/checklist';
export class Task{
    taskId:number;
    taskTitle:string;
    taskDescription:string;
    taskNumber:number;
    status:number;
    beginDate:Date;
    completeDate:Date;
    cid: number
}