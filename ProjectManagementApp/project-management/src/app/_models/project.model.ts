export class Project {
  name: string;
  id: string;
  totalTime: string;

  constructor(name: string = '', id: string = '', totalTime:string = '') {
    this.name = name;
    this.id = id;
    this.totalTime = totalTime;
  }
}
