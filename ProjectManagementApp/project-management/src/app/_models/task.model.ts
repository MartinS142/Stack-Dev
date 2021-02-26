export class Task {
  name: string;
  task_id: string;
  totalTime: string;


  constructor(name: string = '', task_id:string = '', totalTime:string = '') {
    this.name = name;
    this.task_id = task_id;
    this.totalTime=totalTime;
  }
}
