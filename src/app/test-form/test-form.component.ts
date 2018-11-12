import { Component, OnInit } from '@angular/core';
import { RunTestsService } from '../run-tests.service';
import { UpdateNavbarService } from '../update-navbar.service';
import { SpinnerServiceService } from '../spinner-service.service';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {

  constructor(private data: RunTestsService, private navBarService: UpdateNavbarService,  private spinnerService: SpinnerServiceService) {}

  project: string = '';
  browser: string = 'chrome';
  snapshot: string = 'browser';
  host: string = '192.168.163.225';
  release: string = '';
  url: string = '';
  snapshotType: string = 'no';
  localMachine: string = 'server';
  reqObj: object = {};
  byteArray: any[];
  eleArray: Element[];
  isTCAccepted: boolean = false;
  isSfdcProj: boolean = false;
  showSfdcProj: boolean = false;
  //importedFileName: string = '';
  showTestUpload: boolean = false;
  showForm: boolean = true;
  isUploadDone: boolean = false;
  showLastStep: boolean = false;
  showFormError: boolean = false;
  execMgrFileName: string = '';
  testCreationFileName: string = '';

  ngOnInit() {
    this.navBarService.updateNavBar(false, '/test');
  }
  onChange(newValue) {
    this.showSfdcProj = (newValue === 'true');
  }
  onFileUpload(event) {
    var files = event.currentTarget.files;
    var targetUpload = event.currentTarget;
    if(event.currentTarget.id == "execMgr") {
      this.execMgrFileName = files[0].name;
    }
    if(event.currentTarget.id == "testCreation") {
      this.testCreationFileName = files[0].name;
    }
    //this.importedFileName = files[0].name;
    var fileData = new Blob([files[0]], {type : "text/plain"});
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileData);
    reader.addEventListener("loadend", function(e) {
      this.byteArray = new Uint8Array(e.srcElement.result);
      this.callUploadServices(targetUpload);
    }.bind(this));
  }

  callUploadServices(targetBtn) {
    var reqObj = {
      'ProjectName': this.project,
      'ReleaseName': this.release,
      'fileName': this.testCreationFileName
    };
    if(targetBtn.id === "testCreation" && !this.showLastStep) {
      this.showLastStep  = true;
    }
  }
  onDownload() {
    if(!this.showForm) {
      this.showForm = true;
    }
  }
  onProceed() {
    if(!this.triggerFormValidation()) {
      this.showFormError = false;
      this.showTestUpload = true;
      this.showForm = false;
    }
    else {
      this.showFormError = true;
    }
  }
  triggerFormValidation() {
    var errCount = 0;
    this.eleArray = Array.from(document.getElementById('formContainer').querySelectorAll('*'));
    this.eleArray.forEach(function(ele){
      if(['INPUT','SELECT'].indexOf(ele.tagName) !== -1 && ele.offsetParent!== null) {
        if(ele.value === '') {
          errCount++;
        }
      }
    }.bind(this));
    return errCount;
  }
   onSubmit() {
    var reqObj = {
      'NoOftests': this.byteArray,
      'fileName': this.testCreationFileName,
      'ProjectName': this.project,
      'ReleaseName': this.release,
      'Browser': this.browser,
      'Url': this.url,
      'Snapshot': this.snapshot,
      'SnapshotType': this.snapshotType,
      'HostName': this.host,
      'LocalMachine': this.localMachine
    };
    this.spinnerService.displaySpinner(true);
    this.data.postDetails(reqObj);
  };
}

