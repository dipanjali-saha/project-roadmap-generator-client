import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  DayMarkersService,
  EditService,
  FilterService,
  GanttModule,
  ReorderService,
  ResizeService,
  SelectionService,
  SortService,
  ToolbarService
} from '@syncfusion/ej2-angular-gantt';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ProjectComponent} from './project/project.component';
import {EmployeeComponent} from './employee/employee.component';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DialogModule} from '@syncfusion/ej2-angular-popups';
import {UploadLeaveComponent} from './employee/uploadLeaveComponent/upload-leave.component';
import {UploadProjectDetailsComponent} from './project/uploadProjectComponent/upload-project-details.component';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    EmployeeComponent,
    UploadLeaveComponent,
    UploadProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    GanttModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DialogModule,
    ToastModule
  ],
  providers: [ResizeService, SortService, FilterService, SelectionService, ReorderService,
    EditService, DayMarkersService, ToolbarService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
