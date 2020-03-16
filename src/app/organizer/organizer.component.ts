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
    workers: WorkerRes[] = [];
    allWorkers: WorkerRes[] = [];

    selectedProject: ProjectRes;
    selectedWorker: WorkerRes;

    searchText: string;

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
                    const indexOf = this.projects.indexOf(project);
                    this.projects.splice(indexOf, 1);
                    alert(res);
                },
                err => {
                    alert('System error');
                }
            );
        }
    }

    selectProject(project: ProjectRes) {
        this.selectedProject = project;
        this.workers = project.workers;
    }

    selectWorker(worker: WorkerRes) {
        this.selectedWorker = worker;
    }

    removeWorker(worker: WorkerRes) {
        if (confirm('Are you sure you want to delete?')) {
            this.apiService.deleteWorker(worker.id).subscribe(
                res => {
                    const indexOfNote = this.workers.indexOf(worker);
                    this.workers.splice(indexOfNote, 1);
                    alert(res);
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
                alert(res);
            },
            err => {
                alert('An error has occurred');
            }
        );
    }

    private getWorkers() {
        this.apiService.getAllWorkers().subscribe(
            res => {
                this.workers = res;
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

    exchangeWorker($event: WorkerRes) {
        return null;
    }


    selectAllProjects() {
        this.selectedProject = null;
        this.getAllProjects();
    }

    assignWorker(project: ProjectRes, worker: WorkerRes) {
        const newS: Subscription = {
            worker: worker,
            project: project
        };
        this.apiService.subscribe(newS).subscribe(
            res => {
                alert(res);
            },
            err => {
                alert('An error has occurred');
            }
        );
    }
}
