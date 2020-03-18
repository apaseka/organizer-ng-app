import {WorkerModel} from './workerModel';
import {ProjectModel} from './projectModel';

export interface Subscription {
 worker: WorkerModel;
 project: ProjectModel;
}
