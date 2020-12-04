import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {DialogComponent} from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-upload-project-details',
  templateUrl: 'upload-project-details.component.html'
})

export class UploadProjectDetailsComponent {
  @ViewChild('uploadProject') public uploadProjectDialog: DialogComponent;

  @Output() public sendValue = new EventEmitter<File>();

  uploadedFile: File;

  public dlgButtons: any[] = [{click: this.dlgSubmitBtnClick.bind(this), buttonModel: {content: 'Submit', isPrimary: true}}];
  public target = '.upload-project-details-section';

  public showDialog(): void {
    this.uploadProjectDialog.show();
  }

  handleFileInput(event) {
    if (event.target.files.length > 0) {
      this.uploadedFile = event.target.files[0];
    }
  }

  public dlgSubmitBtnClick(): void {
    this.uploadProjectDialog.hide();
    this.sendValue.emit(this.uploadedFile);
  }
}
