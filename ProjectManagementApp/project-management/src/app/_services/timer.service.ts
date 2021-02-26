import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor(private socket: Socket, private httpClient: HttpClient) { }

  sendMessage(message: string): void {
    this.socket.emit('user message', message);
  }

  getMessages(): any {
    return this.socket.fromEvent('user message');
  }


  startTimer(task_id: string, start: string):void {
    this.socket.emit('timer', start, task_id);
  }

  stopTimer(task_id: string):void {
    this.socket.emit('timer');
  }

  start(name: string):void {
    this.socket.emit('startTimer', name);
  }

  stop(name: string):void {
    this.socket.emit('stopTimer', name);
    this.getTime();
  }

  startTask(name: string):void {
    this.socket.emit('startTask', name);
  }

  stopTask(name: string):void {
    this.socket.emit('stopTask', name);
  }

  getTime(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/time`);
  }

  updateTime( taskToUpdate ): any{
    let options = { datetime: taskToUpdate.datetime, _id: taskToUpdate._id };
    return this.httpClient.request<any>('PUT', `${environment.apiUrl}/updateTime/`, { body: options });
  }


  getTimers(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/time`);
  }

  getDiff(name): Observable<any> {
    let params = new HttpParams();
    params = params.append('task_name', name);
    console.log("getDiff(name) = "+ name);
    return this.httpClient.get<any>(`${environment.apiUrl}/diff`, {params: params});
  }

  updateTimer(name): Observable<any> {
    let options = { task_name: name };
    return this.httpClient.request<any>('PUT', `${environment.apiUrl}/updateTimer/`, { body: options });
  }


  updateTotalTime(task_id): Observable<any> {

    let options = { task_id: task_id };
    // server side: create PUT('/updateTotalTime')
    return this.httpClient.request<any>('PUT', `${environment.apiUrl}/updateTotalTime/`, { body: options });
  }

}
