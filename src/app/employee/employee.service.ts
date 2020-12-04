import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import {Employee} from './model/employee.model';
import {Observable} from 'rxjs';
import {EmployeeListWrapperModel} from './model/employee-list-wrapper.model';
import {take} from 'rxjs/operators';
import {EmployeeLeaveModel} from './model/employee-leave.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getAllEmployees(): Observable<EmployeeListWrapperModel> {
    return this.http.get<EmployeeListWrapperModel>('http://localhost:8080/api/v1/employee').pipe(
      take(1)
    );
  }

  saveOrUpdateEmployee(employee: Employee): Observable<EmployeeListWrapperModel> {
    return this.http.post<EmployeeListWrapperModel>('http://localhost:8080/api/v1/employee', employee).pipe(
      take(1)
    );
  }

  saveEmployeeLeavePlan(employeeLeave: EmployeeLeaveModel): Observable<HttpEvent<any>> {
    const params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
    };
    const formData: FormData = new FormData();
    formData.append('employeeId', employeeLeave.employee.employeeId.toString());
    formData.append('employeeLeaveFile', employeeLeave.uploadedLeaveFile);
    const req = new HttpRequest('POST', 'http://localhost:8080/api/v1/employee/uploadLeaves', formData, options);
    return this.http.request(req);
  }
}
