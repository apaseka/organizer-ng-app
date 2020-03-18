import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {WorkerResponse} from '../model/workerResponse';
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorModel} from "../model/errorModel";

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  model: WorkerViewModel = {
    title: null,
    firstName: '',
    secondName: '',
    age: null
  };
  worker: WorkerResponse;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }

  createWorker() {
    this.apiService.createUpdateWorker(this.model).subscribe(
      res => {
        this.worker = res;
        location.reload();
        alert(this.worker.msg);
      },
      err => {
        alert((<ErrorModel>(<HttpErrorResponse>err).error).message);
      }
    );
  }
}

enum Title {
  CODER, HR, ACCOUNTANT,
}

export interface WorkerViewModel {
  title: Title;
  firstName: string;
  secondName: string;
  age: number;
}
