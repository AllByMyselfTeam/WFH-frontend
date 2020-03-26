import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/models/task';
import { Checklist } from 'src/app/models/checklist';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() check:Checklist;
  tasks:Task[];
  
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.taskService.getAllTask(this.check.checkId).subscribe(data=>{
      this.tasks = data;
      console.log(this.tasks);
    })
  }

}
