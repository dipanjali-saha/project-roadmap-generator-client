import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {DialogComponent} from '@syncfusion/ej2-angular-popups';
import {Employee} from '../model/employee.model';
import {EmployeeLeaveModel} from '../model/employee-leave.model';

@Component({
  selector: 'app-upload-leave',
  templateUrl: 'upload-leave.component.html'
})

export class UploadLeaveComponent {
  @ViewChild('uploadLeave') public uploadLeaveDialog: DialogComponent;

  @Output() public sendValue = new EventEmitter<EmployeeLeaveModel>();

  employee: Employee;
  uploadedFile: File;

  public dlgButtons: any[] = [{ click: this.dlgSubmitBtnClick.bind(this), buttonModel: { content: 'Submit', isPrimary: true } }];
  public target = '.upload-emp-leave-section';

  public showDialog(employee: Employee): void {
    this.employee = employee;
    this.uploadLeaveDialog.show();
  }

  handleFileInput(event) {
    if (event.target.files.length > 0) {
      this.uploadedFile = event.target.files[0];
    }
  }

  public dlgSubmitBtnClick(): void {
    this.uploadLeaveDialog.hide();
    this.sendValue.emit({employee: this.employee, uploadedLeaveFile: this.uploadedFile});
  }
}
