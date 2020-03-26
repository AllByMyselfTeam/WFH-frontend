import { Checklist } from 'src/app/models/checklist';
import { Team } from 'src/app/models/team';

export class User{
    userId:number;
    username:string;
    password:string;
    fname:string;
    lname:string;
    email:string;
    phone:string;
    title:string; 
    teamIds: Team[];
}