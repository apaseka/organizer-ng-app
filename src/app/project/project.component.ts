import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {ProjectResponse} from '../model/projectResponse';
import {ErrorModel} from '../model/errorModel';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project: ProjectResponse;

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
        location.reload();
        alert(this.project.msg);
      },
      err => {
        alert((<ErrorModel>(<HttpErrorResponse>err).error).message);
      }
    );
  }
}


export interface ProjectViewModel {
  name: string;
  fromDate: string;
  toDate: string;
}
