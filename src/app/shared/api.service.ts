import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProjectViewModel} from '../project/project.component';
import {ProjectResponse} from '../model/projectResponse';
import {WorkerViewModel} from '../worker/worker.component';
import {WorkerResponse} from '../model/workerResponse';
import {ProjectModel} from '../model/projectModel';
import {WorkerModel} from '../model/workerModel';
import {Subscription} from '../model/subscription';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = window['cfgApiBaseUrl'];
  private PROJECT_URL = `${this.BASE_URL}/project`;
  private UPDATE_PROJECT_URL = `${this.PROJECT_URL}/change`;
  private WORKER_URL = `${this.BASE_URL}/worker`;

  constructor(private http: HttpClient) {

  }

  getAllProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(this.PROJECT_URL);
  }

  postProject(model: ProjectViewModel): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>(this.PROJECT_URL, model);
  }

  delProject(id: string): Observable<any> {
    return this.http.delete(this.PROJECT_URL + '/' + id, {responseType: 'text'});
  }

  updateProject(model: ProjectModel): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>(this.UPDATE_PROJECT_URL, model);
  }

  deleteWorker(id: string): Observable<any> {
    return this.http.delete(this.WORKER_URL + '/' + id, {responseType: 'text'});
  }

  getAllWorkers(): Observable<WorkerModel[]> {
    return this.http.get<WorkerModel[]>(this.WORKER_URL);
  }

  createUpdateWorker(model: WorkerViewModel | WorkerModel): Observable<WorkerResponse> {
    return this.http.post<WorkerResponse>(this.WORKER_URL, model);
  }

  subscribe(model: Subscription): Observable<any> {
    return this.http.post(this.PROJECT_URL + '/subscribe', model, {responseType: 'text'});
  }

  unsubscribe(model: Subscription): Observable<any> {
    return this.http.post(this.PROJECT_URL + '/unsubscribe', model, {responseType: 'text'});
  }
}
