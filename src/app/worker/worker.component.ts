import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Worker} from '../model/worker';

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
  worker: Worker;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }

  createWorker() {
    this.apiService.postWorker(this.model).subscribe(
      res => {
        this.worker = res;
        alert(this.worker.msg);
        if (!this.worker.msg.includes('already')) {
          location.reload();
        }
      },
      err => {
        alert('An error has occurred while adding specialist');
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
