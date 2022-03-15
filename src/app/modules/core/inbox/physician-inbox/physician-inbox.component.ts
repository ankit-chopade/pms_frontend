import { Component, OnInit } from '@angular/core';
import { DayAndDate } from '../model/DayAndDate';
import { PatientAppointment } from '../model/patientappointment';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-physician-inbox',
  templateUrl: './physician-inbox.component.html',
  styleUrls: ['./physician-inbox.component.scss']
})
export class PhysicianInboxComponent implements OnInit {
  physicianname: string;
  layout: any[];
  userId: number;
  AppoinmentData:PatientAppointment[]
  dayAndDateList: any[]=[];
  days:string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  nextDay: number=0;

  constructor(private apiCommonService: ApiService) {
    const today = new Date();
   // this.layout = [...Array(7).keys()].map(i => days[(i + today.getDay()) % days.length],today.getDate());
    //this.layout[this.layout.length - 1] = this.layout[this.layout.length - 1];
    
  }

  displayedColumns: string[] = ['AppointmentID', 'MeetingTitle', 'Description',  'Time'];
  patientData:PatientAppointment[]=[];
  dataSource:any[]=[];
  ngOnInit(): void {
    this.physicianname=sessionStorage.getItem('firstName') + ' ' 
    + sessionStorage.getItem('lastName');
    this.getDayAndDate()
    this.userId= Number(sessionStorage.getItem('userId'))
    console.log(this.userId)


  }
  getAppointmentByDate(date:Date){
    console.log(date)
  //  const customDate: string=new Date().toISOString().replace('T',' '); 
    const customDate: string=date.toISOString().replace('T',' '); 

    const param = {
      date: customDate,
      patientId: this.userId
    };
    this.apiCommonService.getAppointmentsByDateAndPhysicianId(param).subscribe(
      resp => {
        if (resp['status'] === 200 && resp['result'] && resp != null) {
          this.dataSource = resp['result'];
          // this.AppoinmentData = resp['result'];
          // console.log(this.patientData)
          // this.AppoinmentData.find(element =>
          //   {
          //     console.log(element)
          //     if( element.patientId==this.userId)
          //          this.patientData.push(element);
          //   })
          //   this.dataSource=this.patientData;
          console.log(this.dataSource);
         
        }


      })
      
  }

  getDayAndDate(){
   let currentDate: Date= new Date();
   
    for (let index = 0; index < 7; index++) {
      let dayAndDate= new DayAndDate();
      let date=currentDate.setDate(currentDate.getDate()+this.nextDay);
      this.nextDay=+1;
     
      console.log(date)
      let newDate:Date=new Date(date);
      dayAndDate.date=newDate
      console.log(dayAndDate)
      dayAndDate.day=this.days[newDate.getDay()]
        console.log(dayAndDate);
      this.dayAndDateList.push(dayAndDate);      
    }

    console.log(this.dayAndDateList)
    
  }
  
}
