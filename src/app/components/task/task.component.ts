import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/models/task';
import { Checklist } from 'src/app/models/checklist';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert/alert.service';

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
  demoTask:Task;
  
  constructor(private taskService:TaskService,
              private formBuilder:FormBuilder,
              private alert:AlertService
             ) { 
                this.task = new Task();
  }
  
  ngOnInit(): void {
    this.taskService.getAllTask(this.check.checkId).subscribe(data=>{
      this.tasks = data;
    })
    this.taskForm = this.formBuilder.group({
      taskDescription:[''],
      taskTitle:['']
    });
  }
 

  onSubmit() {
    // stop here if form is invalid
    if (this.taskForm.invalid) {
        return;
    }else{
      this.task.cid = this.check.checkId;
      this.task.status = 0;
     this.taskService.addTask(this.task).subscribe(res=>{
       this.ngOnInit();
       this.alert.success('Adding task successful!!');
     });
     
    }
  }

  editTask(task:Task){
    console.log(task);
    this.taskService.updateTask(task).subscribe(res=>{
      this.demoTask = res;
    })
  }

  finishTask(task:Task){
    task.status = 1;
    this.taskService.updateTask(task).subscribe(res=>{
      this.demoTask = res;
    })
  }

  removeTask(taskId:number){
    this.taskService.deleteTask(taskId).subscribe(data=>{
      this.ngOnInit();
    });
   
  }

}
