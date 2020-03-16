import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Project} from '../model/project';
import {MyError} from '../model/myError';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: Project;
  error: MyError;

  model: ProjectViewModel = {
    name: '',
    fromDate: '',
    toDate: ''
  };

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }

  createProject() {
    this.apiService.postProject(this.model).subscribe(
      res => {
        this.project = res;
        alert(this.project.msg);
        if (!this.project.msg.includes('unique')) {
          location.reload();
        }
      },
      err => {
        const error1 = (<HttpErrorResponse>err).error;
        const message = (<MyError>error1).message;
        if (message.includes('query did not return a unique result')) {
          alert('Name not unique');
        } else {
          alert('System error');
        }
      }
    );
  }
}


export interface ProjectViewModel {
  name: string;
  fromDate: string;
  toDate: string;
}
