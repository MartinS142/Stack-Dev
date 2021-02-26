import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private httpClient: HttpClient) {}


  getTasks(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/tasks/`);
  }

  getProjectTasks(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/tasks/${id}`);
  }

  create(newTask, projectId){
    return this.httpClient.post<any>(`${environment.apiUrl}/task`, {name: newTask, project_id: projectId})
  }

  getTaskID(name): Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}/tasks`);
  }

  destroy(task): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/task/${task._id}`);
  }

  removeTasks(arrayNames, nameToRemove): any {
    for (let i = 0; i <= arrayNames.length; i++) {
      if (arrayNames[i]._id === nameToRemove._id) {
        arrayNames.splice(i, 1);
        return arrayNames;
      }
    }
  }

}

