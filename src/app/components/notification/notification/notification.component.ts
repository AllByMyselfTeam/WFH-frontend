import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() team:number;
  notifications :Notification[];
  constructor(private notificaitonService: NotificationService) { }

  ngOnInit(): void {
    this.notificaitonService.getAllNotification(this.team).subscribe(data=>{
      this.notifications = data;
    });
  }

}
