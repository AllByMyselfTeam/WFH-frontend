import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Notification } from 'src/app/models/notification';
import { AlertService } from 'src/app/services/alert/alert.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() team:number;
  notifyAdd: Notification;
  notifications: Notification[];
  showAdd: boolean = false;

  addNotifyForm:FormGroup;

  constructor(
    private notificationService: NotificationService,
    private formBuilder:FormBuilder,
    private alert:AlertService
    ) { 
      this.notifyAdd = new Notification();
    }

  ngOnInit(): void {
    this.notificationService.getAllNotification(this.team).subscribe(data=>{
      this.notifications = data;
    });

    this.addNotifyForm = this.formBuilder.group({
      notifyTitle:[''],
      notifyDescription:['']
    });
  }

  addNotify(){
    // stop here if form is invalid
    if (this.addNotifyForm.invalid) {
        return;
    }else{
      this.notifyAdd.team=this.team;
      this.notificationService.addNotify(this.notifyAdd).subscribe(res=>{
        this.notifyAdd = new Notification();
        this.ngOnInit();
      });
    }
  }

  removeNotification(notifyId:number){
    this.notificationService.deleteNotification(notifyId).subscribe(data=>{
      this.ngOnInit();
      this.alert.success("Notification had been removed");
    },
    (error)=>{
      this.alert.error(error.error.error);
    });
  }

  toggleShow(){
    this.showAdd = !this.showAdd;
  }


}
