import {Pipe, PipeTransform} from '@angular/core';
import {WorkerModel} from '../model/workerModel';

@Pipe({
  name: 'TextFilter'
})
export class TextFilterPipe implements PipeTransform {

  transform(workers: WorkerModel[], text: string): WorkerModel[] {
    if (text == null || text === '') {
      return workers;
    }
    return workers.filter(w => w.firstName.includes(text) || w.secondName.includes(text));
  }

}
