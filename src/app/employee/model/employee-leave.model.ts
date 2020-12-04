import {Employee} from './employee.model';

export interface EmployeeLeaveModel {
  employee: Employee,
  uploadedLeaveFile: File
}
