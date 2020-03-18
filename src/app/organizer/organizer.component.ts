import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {ProjectRes} from '../model/projectRes';
import {HttpErrorResponse} from '@angular/common/http';
import {MyError} from '../model/myError';
import {WorkerRes} from '../model/workerRes';
import {Subscription} from '../model/subscription';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  projects: ProjectRes[] = [];
  linkedWorkers: WorkerRes[] = [];
  allWorkers: WorkerRes[] = [];

  selectedProject: ProjectRes;
  selectedWorker: WorkerRes;

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

  updateProject(project: ProjectRes) {
    this.apiService.updateProject(project).subscribe(
      res => {
      },
      err => {
        const error1 = (<HttpErrorResponse>err).error;
        const message = (<MyError>error1).message;
        if (message.includes('ConstraintViolationException')) {
          this.getAllProjects();
          alert('Name not unique');
        } else {
          alert('System error');
        }
      }
    );
  }

  deleteProject(project: ProjectRes) {
    if (confirm('Are you sure you want to delete project?')) {
      this.apiService.delProject(project.id).subscribe(
        res => {
          if ((<String>res).includes("Can't remove")) {
            alert(res);
          } else {
            const indexOf = this.projects.indexOf(project);
            this.projects.splice(indexOf, 1);
            alert(res);
          }
        },
        err => {
          alert('System error');
        }
      );
    }
  }

  selectProject(project: ProjectRes) {
    this.selectedProject = project;
    this.linkedWorkers = project.workers;
  }

  selectWorker(worker: WorkerRes) {
    this.selectedWorker = worker;
  }

  removeWorker(worker: WorkerRes) {
    if (confirm('Are you sure you want to delete?')) {
      this.apiService.deleteWorker(worker.id).subscribe(
        res => {
          if ((<String>res).includes('Specialist can\'t be removed while is assigned to project!')) {
            alert(res);
          } else {
            this.fixLinkedWorkersList(worker);
          }
        },
        err => {
          alert('An error has occurred');
        }
      );
    }
  }

  updateWorker(worker: WorkerRes) {
    this.apiService.updateWorker(worker).subscribe(
      res => {
      },
      err => {
        alert('An error has occurred');
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

  selectAllProjects() {
    this.selectedProject = null;
    return this.projects;
  }

  assignWorker(project: ProjectRes, worker: WorkerRes) {
    const newS: Subscription = {
      worker: worker,
      project: project

    };
    this.apiService.subscribe(newS).subscribe(
      res => {
        if (!project.workers.includes(worker))
          project.workers.push(worker);
        alert(res);
      },
      err => {
        alert('An error has occurred');
      }
    );
  }

  unlinkWorker(project: ProjectRes, worker: WorkerRes) {
    const newS: Subscription = {
      worker: worker,
      project: project
    };
    this.apiService.unsubscribe(newS).subscribe(
      res => {
        this.fixLinkedWorkersList(worker);
        alert(res);
      },
      err => {
        alert('An error has occurred');
      }
    );
  }

  private fixLinkedWorkersList(worker: WorkerRes) {
    const indexOfNote = this.linkedWorkers.indexOf(worker);
    this.linkedWorkers.splice(indexOfNote, 1);
  };
}
