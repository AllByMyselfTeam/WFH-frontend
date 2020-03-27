import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from 'src/app/models/meeting';
import { MeetingService } from 'src/app/services/meeting/meeting.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  @Input() team:number;
  meetings:Meeting[];
  constructor(private meetingService:MeetingService) { }

  ngOnInit(): void {
    this.meetingService.getAllMeeting(this.team).subscribe(data=>{
      this.meetings = data;
    })
  }

}
