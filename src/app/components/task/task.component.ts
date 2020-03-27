import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/models/task';
import { Checklist } from 'src/app/models/checklist';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() check:Checklist;
  tasks:Task[];
  panelOpenState = false;
  taskForm:FormGroup;
  task:Task;
  
  constructor(private taskService:TaskService,
              private formBuilder:FormBuilder) { 
                this.task = new Task();
  }

  ngOnInit(): void {
    this.taskService.getAllTask(this.check.checkId).subscribe(data=>{
      this.tasks = data;
    })
    this.taskForm = this.formBuilder.group({
      taskDescription:['']
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.taskForm.invalid) {
        return;
    }else{
      this.task.cid = this.check.checkId;
      this.task.status = 0;
      
      console.log(this.task.taskDescription)
     this.taskService.addTask(this.task).subscribe(res=>{
       this.task = res;
       this.ngOnInit();
     });
     
    }
  }

  removeTask(taskId:number){
    this.taskService.deleteTask(taskId).subscribe(data=>{
      this.ngOnInit();
    });
   
  }

}
