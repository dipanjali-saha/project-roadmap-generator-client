import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ProjectDetailsWrapperModel} from './model/project-details-wrapper.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  getAllProjects(): Observable<ProjectDetailsWrapperModel> {
    return this.http.get<ProjectDetailsWrapperModel>('http://localhost:8080/api/v1/project').pipe(
      take(1)
    );
  }

  saveProjectDetails(projectDetailsFile: File): Observable<ProjectDetailsWrapperModel> {
    const params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
    };
    const formData: FormData = new FormData();
    formData.append('projectDetailsFile', projectDetailsFile);
    return this.http.post<ProjectDetailsWrapperModel>('http://localhost:8080/api/v1/project', formData, options).pipe(
      take(1)
    );
  }

  generateRoadmap(projectId: number): Observable<ProjectDetailsWrapperModel> {
    return this.http.post<ProjectDetailsWrapperModel>('http://localhost:8080/api/v1/project-roadmap', projectId).pipe(
      take(1)
    );
  }

}
