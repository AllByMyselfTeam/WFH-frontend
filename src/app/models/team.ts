import { User } from './user';

export class Team{
    teamId:number;
    teamName:string;
    managerId:number;
    users:User[];
}