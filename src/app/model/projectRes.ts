import {WorkerRes} from './workerRes';

export interface ProjectRes {
  id: string;
  name: string;
  fromDate: string;
  toDate: string;
  workersNumber: number;
  workers: WorkerRes [];
}
