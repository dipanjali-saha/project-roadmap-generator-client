import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public data: Object[];
  public taskfield: Object;

  constructor() { }

  ngOnInit() {
    this.data = [{
      TaskID: 1,
      TaskName: 'Product Concept',
      StartDate: new Date('04/02/2019'),
      EndDate: new Date('04/21/2019'),
      subtasks: [{
        TaskID: 2,
        TaskName: 'Defining the product and its usage',
        StartDate: new Date('04/02/2019'),
        Duration: 5,
        Progress: 30
      },

      ]
    },];
    this.taskfield = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      child: 'subtasks'
    };
  }
}
