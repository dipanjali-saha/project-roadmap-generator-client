import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectDetailsModel} from './model/project-details.model';
import {UploadProjectDetailsComponent} from './uploadProjectComponent/upload-project-details.component';
import {MilestoneRoadmapModel} from './model/milestone.roadmap.model';
import {ProjectService} from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @ViewChild(UploadProjectDetailsComponent) private projectDetailsUploadDialog: UploadProjectDetailsComponent;

  public data: MilestoneRoadmapModel[];
  public taskSettings: any;
  public columns: any[];

  public selectedProject: ProjectDetailsModel = null;

  constructor(private projectService: ProjectService) {
  }

  projectsList: ProjectDetailsModel[] = [];

  ngOnInit(): void {
    this.taskSettings = {
      id: 'ID',
      name: 'Name',
      startDate: 'StartDate',
      endDate: 'EndDate',
      assignedTo: 'AssignedTo',
      child: 'tasks'
    };

    this.columns = [
      {field: 'SlNo', headerText: 'Sl.No.'},
      {field: 'Name', headerText: 'Name'},
      {field: 'AssignedTo', headerText: 'Assignee'}
    ];
    this.initializeData();
  }

  addNewProject(): void {
    this.projectDetailsUploadDialog.showDialog();
  }

  recordProjectDetails(projectDetailsFile: File): void {
    this.projectService.saveProjectDetails(projectDetailsFile).subscribe(projectsListResponse => {
      this.projectsList = projectsListResponse.projectDetails;
    });
  }

  viewProjectRoadmap(project: ProjectDetailsModel): void {
    this.selectedProject = project;
    this.data = this.selectedProject.milestones.map(milestone =>
      ({
        ID: 'M'.concat(String(milestone.milestoneId)),
        SlNo: milestone.priority,
        Name: milestone.name,
        StartDate: milestone.startDate,
        EndDate: milestone.endDate,
        AssignedTo: null,
        tasks: milestone.tasks.map(task =>
          ({
            ID: 'T'.concat(String(task.taskId)),
            SlNo: task.priority,
            Name: task.name,
            StartDate: task.startDate,
            EndDate: task.endDate,
            AssignedTo: task.assignedTo,
          })
        )
      }));
  }

  initializeData(): void {
    this.projectService.getAllProjects().subscribe(projectsListResponse => {
      this.projectsList = projectsListResponse.projectDetails;
    });
  }
}
