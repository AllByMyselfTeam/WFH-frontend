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
                
  }
  
  ngOnInit(): void {
    this.task = new Task();
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
     this.taskService.addTask(this.task).subscribe(
      (response) => this.refresh(response),
      (error)=>{
        this.alert.error(error.error.error);
      }  
    );
     
    }
  }

  refresh(res): void{
    this.ngOnInit();
    this.alert.success('Adding task successful!!');

  }

  editTask(task:Task){

    this.taskService.updateTask(task).subscribe(
      (res)=>this.update(res),
      (error)=>{
        this.alert.error(error.error.error);
      }
    )
  }

  update(res):void{
    this.ngOnInit();
    this.alert.success('Update task successful!!');
  }

  finishTask(task:Task){
    task.status = 1;
    this.taskService.updateTask(task).subscribe(res=>{
      this.demoTask = res;
      this.alert.success("Task has been completed");
    },
    (error)=>{
      this.alert.error(error.error.error);
    })
  }

  removeTask(taskId:number){
    this.taskService.deleteTask(taskId).subscribe(data=>{
      this.ngOnInit();
      this.alert.success("Task had been removed");
    },
    (error)=>{
      this.alert.error(error.error.error);
    });
  }

}
