import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkerRes} from '../../model/workerRes';

@Component({
  selector: 'app-worker-comp',
  templateUrl: './worker-comp.component.html',
  styleUrls: ['./worker-comp.component.css']
})
export class WorkerCompComponent implements OnInit {

  @Input() worker: WorkerRes;
  @Output() workerUpdated: EventEmitter<WorkerRes> = new EventEmitter<WorkerRes>();
  @Output() workerDeleted: EventEmitter<WorkerRes> = new EventEmitter<WorkerRes>();
  @Output() workerExchange: EventEmitter<WorkerRes> = new EventEmitter<WorkerRes>();

  constructor() {
  }

  ngOnInit() {
  }

  wUpdated() {
    this.workerUpdated.emit(this.worker);
  }

  wDeleted() {
    this.workerDeleted.emit(this.worker);
  }

  wExchange() {
    this.workerExchange.emit(this.worker);
  }
}

