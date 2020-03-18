import {WorkerModel} from './workerModel';

export interface ProjectModel {
  id: string;
  name: string;
  fromDate: string;
  toDate: string;
  workersNumber: number;
  workers: WorkerModel [];
}
