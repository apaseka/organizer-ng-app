import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkerRes} from '../../model/workerRes';
import {OrganizerComponent} from "../../organizer/organizer.component";

@Component({
  selector: 'app-worker-comp',
  templateUrl: './worker-comp.component.html',
  styleUrls: ['./worker-comp.component.css']
})
export class WorkerCompComponent implements OnInit {

  @Input() worker: WorkerRes;
  @Output() workerUpdated: EventEmitter<WorkerRes> = new EventEmitter<WorkerRes>();
  @Output() workerDeleted: EventEmitter<WorkerRes> = new EventEmitter<WorkerRes>();
  @Output() workerUnlink: EventEmitter<WorkerRes> = new EventEmitter<WorkerRes>();

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

