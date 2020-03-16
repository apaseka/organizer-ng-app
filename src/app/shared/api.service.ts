import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProjectViewModel} from '../project/project.component';
import {Project} from '../model/project';
import {WorkerViewModel} from '../worker/worker.component';
import {Worker} from '../model/worker';
import {ProjectRes} from '../model/projectRes';
import {WorkerRes} from '../model/workerRes';
import {Subscription} from '../model/subscription';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = window['cfgApiBaseUrl'] + '/api';
  private BASE_URL2 = window['cfgApiBaseUrl'];
  public ALL_NOTEBOOKS_URL = `${this.BASE_URL}/notebooks/all`;
  private PROJECT_URL = `${this.BASE_URL2}/project`;
  private UPDATE_PROJECT_URL = `${this.PROJECT_URL}/change`;
  private WORKER_URL = `${this.BASE_URL2}/worker`;

  constructor(private http: HttpClient) {

  }

  getAllProjects(): Observable<ProjectRes[]> {
    return this.http.get<ProjectRes[]>(this.PROJECT_URL);
  }

  postProject(model: ProjectViewModel): Observable<Project> {
    return this.http.post<Project>(this.PROJECT_URL, model);
  }

  postWorker(model: WorkerViewModel): Observable<Worker> {
    return this.http.post<Worker>(this.WORKER_URL, model);
  }
  delProject(id: string): Observable<any> {
    return this.http.delete(this.PROJECT_URL + '/' + id, {responseType: 'text'});
  }

  updateProject(model: ProjectRes): Observable<Project> {
    return this.http.post<Project>(this.UPDATE_PROJECT_URL, model);
  }

  deleteWorker(id: string): Observable<any> {
    return this.http.delete(this.WORKER_URL + '/' + id, {responseType: 'text'});
  }

  updateWorker(worker: WorkerRes) {
    return this.http.post<WorkerRes>(this.WORKER_URL + '/update', worker);
  }

  getAllWorkers(): Observable<WorkerRes[]> {
    return this.http.get<WorkerRes[]>(this.WORKER_URL);
  }

  subscribe(model: Subscription): Observable<any> {
    return this.http.post(this.PROJECT_URL + '/subscribe', model, {responseType: 'text'});
  }
}
