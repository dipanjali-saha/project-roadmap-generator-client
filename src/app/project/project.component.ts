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
  @ViewChild('toastElement') toastElement;

  public data: MilestoneRoadmapModel[];
  public taskSettings: any;
  public columns: any[];

  public selectedProject: ProjectDetailsModel = null;

  constructor(private projectService: ProjectService) {
  }

  projectsList: ProjectDetailsModel[] = [];
  public position = { X: 'Right', Y: 'Top' };
  toastMessage = null;

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
      this.initializeData();
      this.toastMessage = { title: 'Success', content: 'Project details saved successfully', cssClass: 'e-toast-success'};
      this.toastShow();
    });
  }

  generateProjectRoadmap(project: ProjectDetailsModel): void {
    this.projectService.generateRoadmap(project.projectId).subscribe(projectsListResponse => {
      this.projectsList = projectsListResponse.projectDetails;
      this.toastMessage = { title: 'Success', content: 'Project roadmap generated successfully', cssClass: 'e-toast-success'};
      this.toastShow();
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

  onCreate(event: Event) {
    this.toastElement.show(this.toastMessage);
  }

  btnClick() {
    this.toastShow();
  }

  toastShow() {
    setTimeout(
      () => {
        this.toastElement.show(this.toastMessage);
      }, 0);
  }
}
