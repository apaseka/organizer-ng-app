import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {ProjectModel} from '../model/projectModel';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorModel} from '../model/errorModel';
import {WorkerModel} from '../model/workerModel';
import {Subscription} from '../model/subscription';
import {ProjectResponse} from "../model/projectResponse";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  projects: ProjectModel[] = [];
  linkedWorkers: WorkerModel[] = [];
  notLinkedWorkers: WorkerModel[] = [];
  allWorkers: WorkerModel[] = [];

  selectedProject: ProjectModel;
  selectedWorker: WorkerModel;
  workerId: string;
  workerMap: Map<string, WorkerModel>;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getAllProjects();
    this.getAllWorkers();
  }

  private mapWorkers() {
    this.workerMap = new Map(this.allWorkers.map(w => [w.id, w] as [string, WorkerModel]));
  }

  public getAllProjects() {
    this.apiService.getAllProjects().subscribe(
      res => {
        this.projects = res;
      },
      err => {
        alert('An error has occurred;');
      }
    );
  }

  private getAllWorkers() {
    this.apiService.getAllWorkers().subscribe(
      res => {
        this.allWorkers = res;
        this.mapWorkers();
      },
      err => {
        alert('An error has occurred;');
      }
    );
  }

  updateProject(project: ProjectModel) {
    this.apiService.updateProject(project).subscribe(
      res => {
        alert((<ProjectResponse>res).msg);
      },
      err => {
        this.ngOnInit();
        alert((<ErrorModel>(<HttpErrorResponse>err).error).message);
      }
    );
  }

  deleteProject(project: ProjectModel) {
    if (confirm('Are you sure you want to delete project?')) {
      this.apiService.delProject(project.id).subscribe(
        res => {
          this.ngOnInit();
        },
        err => {
          let parsedMsg = JSON.parse((<HttpErrorResponse>err).error);
          alert((<ErrorModel>parsedMsg).message);
        }
      );
      this.getAllProjects();
    }
  }

  selectAllProjectsWorkers() {
    this.selectedProject = null;
    this.linkedWorkers = this.allWorkers;
  }

  selectProject(project: ProjectModel) {
    this.selectedProject = project;
    this.linkedWorkers = project.workers;
    this.notLinkedWorkers = this.updateNotLinked(project);
  }

  selectWorker(worker: WorkerModel) {
    return this.selectedWorker = worker;
  }

  removeWorker(worker: WorkerModel) {
    if (confirm('Are you sure you want to delete?')) {
      this.apiService.deleteWorker(worker.id).subscribe(
        res => {
          this.ngOnInit();
        },
        err => {
          let parsedMsg = JSON.parse((<HttpErrorResponse>err).error);
          alert((<ErrorModel>parsedMsg).message);
        }
      );
    }
  }

  updateWorker(worker: WorkerModel) {
    this.apiService.createUpdateWorker(worker).subscribe(
      res => {
        this.ngOnInit();
      },
      err => {
        alert("invalid input");
        this.ngOnInit();
      }
    );
  }

  linkWorker(project: ProjectModel, worker: string) {
    const workerModel = this.workerMap.get(worker);
    const newS: Subscription = {
      worker: workerModel,
      project: project
    };
    this.apiService.subscribe(newS).subscribe(
      res => {
        project.workers.push(workerModel);
        this.updateNotLinked(project);
      },
      err => {
        alert('An error has occurred');
      }
    );
  }

  unlinkWorker(project: ProjectModel, worker: WorkerModel) {
    const newS: Subscription = {
      worker: worker,
      project: project
    };
    this.apiService.unsubscribe(newS).subscribe(
      res => {
        project.notLinkedWorkers.push(worker);
        this.removeFromLinkedList(worker, project);
      },
      err => {
        alert('An error has occurred');
      }
    );
  }

  private removeFromLinkedList(worker: WorkerModel, project: ProjectModel) {
    const indexOfNote = project.workers.indexOf(worker);
    this.linkedWorkers.splice(indexOfNote, 1);
  };

  private updateNotLinked(pr: ProjectModel) {
    const diff: WorkerModel[] = [];
    const concat1 = diff.concat(this.allWorkers);
    for (let x of pr.workers) {
      for (let d of concat1) {
        if (d.id == x.id) {
          const indexOfNote = concat1.indexOf(d);
          concat1.splice(indexOfNote, 1);
        }
      }
    }
    this.notLinkedWorkers = concat1;
    return pr.notLinkedWorkers = concat1;
  }
}
