import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {ProjectModel} from '../model/projectModel';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorModel} from '../model/errorModel';
import {WorkerModel} from '../model/workerModel';
import {Subscription} from '../model/subscription';

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

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getAllProjects();
    this.getAllWorkers();
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
      },
      err => {
        alert('An error has occurred;');
      }
    );
  }

  updateProject(project: ProjectModel) {
    this.apiService.updateProject(project).subscribe(
      res => {
      },
      err => {
        const errorMsg = (<ErrorModel>(<HttpErrorResponse>err).error).message;
        location.reload();
        alert(errorMsg);
      }
    );
  }

  deleteProject(project: ProjectModel) {
    if (confirm('Are you sure you want to delete project?')) {
      this.apiService.delProject(project.id).subscribe(
        res => {
          const indexOf = this.projects.indexOf(project);
          this.projects.splice(indexOf, 1);
          this.selectedProject = null;
        },
        err => {
          const errorMsg = (<ErrorModel>(<HttpErrorResponse>err).error).message;
          alert(errorMsg);
        }
      );
    }
  }

  selectAllProjects() {
    this.selectedProject = null;
    return this.projects;
  }

  selectProject(project: ProjectModel) {
    this.selectedProject = project;
    this.linkedWorkers = project.workers;
    this.notLinked();
  }

  selectWorker(worker: WorkerModel) {
    this.selectedWorker = worker;
  }

  removeWorker(worker: WorkerModel) {
    if (confirm('Are you sure you want to delete?')) {
      this.apiService.deleteWorker(worker.id).subscribe(
        res => {
          this.fixLinkedWorkersList(worker);
        },
        err => {
          alert((<ErrorModel>(<HttpErrorResponse>err).error).message);
        }
      );
    }
  }

  updateWorker(worker: WorkerModel) {
    this.apiService.createUpdateWorker(worker).subscribe(
      res => {
      },
      err => {
        location.reload();
        alert((<ErrorModel>(<HttpErrorResponse>err).error).message);
      }
    );
  }

  assignWorker(project: ProjectModel, worker: WorkerModel) {
    const newS: Subscription = {
      worker: worker,
      project: project
    };
    if (!project.workers.includes(worker)) {
      project.workers.push(worker);
    }
    this.apiService.subscribe(newS).subscribe(
      res => {
        // if (!project.allWorkers.includes(worker)) {
        //   project.allWorkers.push(worker);
        // }
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
        this.fixLinkedWorkersList(worker);
      },
      err => {
        alert('An error has occurred');
      }
    );
  }

  private fixLinkedWorkersList(worker: WorkerModel) {
    const indexOfNote = this.linkedWorkers.indexOf(worker);
    this.linkedWorkers.splice(indexOfNote, 1);
  };

  private notLinked() {
    const diff: WorkerModel[] = [];
    diff.concat(this.linkedWorkers).concat(this.allWorkers);
    for (const x of this.linkedWorkers) {
      if (diff.includes(x)) {
        const indexOfNote = diff.indexOf(x);
        diff.splice(indexOfNote, 1);
      }
    }
    this.notLinkedWorkers = diff;
  }
}
