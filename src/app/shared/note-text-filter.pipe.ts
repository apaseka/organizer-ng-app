import {Pipe, PipeTransform} from '@angular/core';
import {WorkerRes} from '../model/workerRes';

@Pipe({
  name: 'TextFilter'
})
export class TextFilterPipe implements PipeTransform {

  transform(workers: WorkerRes[], text: string): WorkerRes[] {
    if (text == null || text === '') {
      return workers;
    }
    return workers.filter(w => w.firstName.includes(text) || w.secondName.includes(text));
  }

}
