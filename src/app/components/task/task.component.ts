import { Component, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Task } from 'src/app/models/task';
import { Checklist } from 'src/app/models/checklist';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

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
              private _ngZone: NgZone) { 
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
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
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
