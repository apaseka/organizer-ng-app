import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkerModel} from '../../model/workerModel';
import {OrganizerComponent} from "../../organizer/organizer.component";

@Component({
  selector: 'app-worker-comp',
  templateUrl: './worker-comp.component.html',
  styleUrls: ['./worker-comp.component.css']
})
export class WorkerCompComponent implements OnInit {

  @Input() worker: WorkerModel;
  @Output() workerUpdated: EventEmitter<WorkerModel> = new EventEmitter<WorkerModel>();
  @Output() workerDeleted: EventEmitter<WorkerModel> = new EventEmitter<WorkerModel>();
  @Output() workerUnlink: EventEmitter<WorkerModel> = new EventEmitter<WorkerModel>();

  constructor(private organizer: OrganizerComponent) {
  }

  ngOnInit() {
  }

  wUpdated() {
    this.workerUpdated.emit(this.worker);
  }

  wDeleted() {
    this.workerDeleted.emit(this.worker);
  }

  wUnlink() {
    this.workerUnlink.emit(this.worker);
  }
}

