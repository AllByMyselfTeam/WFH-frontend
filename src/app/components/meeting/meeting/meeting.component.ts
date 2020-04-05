import { Component, OnInit, Input } from '@angular/core';
import { Meeting } from 'src/app/models/meeting';
import { MeetingService } from 'src/app/services/meeting/meeting.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  @Input() team:number;
  meetings:Meeting[];
  meetingAdd: Meeting;
  addMeetingForm:FormGroup;
  showAdd: boolean = false;


  constructor(
    private meetingService:MeetingService,
    private formBuilder:FormBuilder
    ) { 
    this.meetingAdd = new Meeting();
  }

  ngOnInit(): void {
    this.meetingService.getAllMeeting(this.team).subscribe(data=>{
      this.meetings = data;
    })
    this.addMeetingForm = this.formBuilder.group({
      meetDescription:[''],
      meetLink:['']
    });
  }

  addMeeting(){
    // stop here if form is invalid
    if (this.addMeetingForm.invalid) {
        return;
    }else{
      this.meetingAdd.team=this.team;
      this.meetingService.addMeeting(this.meetingAdd).subscribe(res=>{
        this.meetingAdd = new Meeting();
        this.ngOnInit();
      });
    }
  }

  toggleShow(){
    this.showAdd = !this.showAdd;
  }

}
