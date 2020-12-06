import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee} from './model/employee.model';
import {ProjectListingModel} from '../project/model/project-listing.model';
import {EmployeeService} from './employee.service';
import {UploadLeaveComponent} from './uploadLeaveComponent/upload-leave.component';
import {EmployeeLeaveModel} from './model/employee-leave.model';
import {ProjectService} from '../project/project.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @ViewChild(UploadLeaveComponent) private employeeLeaveUploadDialog: UploadLeaveComponent;
  @ViewChild('toastElement') toastElement;

  constructor(private employeeService: EmployeeService,
              private projectService: ProjectService) {
  }

  employeeList: Employee[] = [];
  projectList: ProjectListingModel[] = [];
  public position = { X: 'Right', Y: 'Top' };
  toastMessage = null;

  ngOnInit(): void {

    this.projectService.getAllProjects().subscribe(projectDetailsResponse => {
      this.projectList = projectDetailsResponse.projectDetails.map(projectDetail => ({
        projectId: projectDetail.projectId,
        projectName: projectDetail.name
      }));
      this.employeeService.getAllEmployees().subscribe(employeeListResponse => {
        this.employeeList = employeeListResponse.employeeList;
      });
    });
  }

  addNewEmployee(): void {
    this.employeeList.push({
      employeeId: null,
      name: null,
      assignedProjectId: null,
      assignedProjectName: null,
      editFlag: true
    });
  }

  editEmployee(emp: Employee): void {
    emp.editFlag = true;
  }

  cancelEmployeeUpdate(emp: Employee): void {
    emp.editFlag = false;
  }

  saveEmployee(emp: Employee): void {
    this.employeeService.saveOrUpdateEmployee(emp).subscribe(employeeListResponse => {
      this.employeeList = employeeListResponse.employeeList;
      this.toastMessage = { title: 'Success', content: 'Employee details saved successfully', cssClass: 'e-toast-success'};
      this.toastShow();
    });
  }

  cancelEmployeeAddition(emp: Employee) {
    const index = this.employeeList.indexOf(emp);
    this.employeeList.splice(index, 1);
  }

  uploadLeavePlan(emp: Employee) {
    this.employeeLeaveUploadDialog.showDialog(emp);
  }

  recordEmployeeLeave(employeeLeavePlan: EmployeeLeaveModel) {
    this.employeeService.saveEmployeeLeavePlan(employeeLeavePlan).subscribe(() => {
      this.toastMessage = { title: 'Success', content: 'Employee leave recorded successfully', cssClass: 'e-toast-success'};
      this.toastShow();
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
