import { Component, OnInit } from '@angular/core';
import {TasksService} from "../_services/tasks.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TimerService } from "../_services/timer.service";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
  public newTask;
  public tasks;
  public projectId;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private timerService: TimerService
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];

    this.tasksService.getProjectTasks(this.projectId).subscribe(returnTasks => {
      this.tasks = returnTasks.docs;
    })

    console.log("projectId = "+ this.projectId);
  }

  saveTask(){
    this.tasksService.create(this.newTask, this.projectId).subscribe( saveTask => {
      this.tasks.push(saveTask);
    })
  }


  deleteTask(taskToDelete): void {
    this.tasksService.destroy(taskToDelete).subscribe(success => {
      this.tasks = this.tasksService.removeTasks(this.tasks, taskToDelete);
    }, error => {
      console.log(error);
    })
  }

  startTask(task): void {
    console.log("start("+task.name+")");
    this.timerService.startTask(task.name);
  }

  stopTask(task): void {

    console.log("stop("+task.name+")");
    console.log("task_id = "+task.task_id);
    this.timerService.stopTask(task.name);

    this.timerService.updateTimer(task.name).subscribe(totalTime => {
      task.totalTime = totalTime;
    })
  }

}
