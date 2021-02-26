import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../_services/projects.service";
import { TimerService } from "../_services/timer.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Project } from "../_models/project.model";



@Component({
  selector: 'app-projects-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})

export class ProjectManagementComponent implements OnInit {
  public newProject;
  public projects;
  public editProject = new Project();
  newMessage: string;
  messageList: string[] = [];
  timeMessage: string;
  mySubscription: any;
  constructor(
    private projectsService: ProjectsService,
    private modalService: NgbModal,
    private timerService: TimerService
  ) { }

  ngOnInit(): void {
    this.projectsService.getAll().subscribe(returnProjects => {
      this.projects = returnProjects.docs;
    })

  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  saveProject(): void {

    this.projectsService.create(this.newProject).subscribe( saveProject => {
      	this.projects.push(saveProject);
      	this.ngOnInit();
    })

  }

  startTimer(): void {
    this.timerService.sendMessage((this.timeMessage));
    this.newMessage = '';
  }


  deleteProject(projectToDelete): void {
    this.projectsService.destroy(projectToDelete).subscribe(success => {
      this.projects = this.projectsService.removeProject(this.projects, projectToDelete);
    }, error => {
      console.log(error);
    })
  }

  newEditProject(content, project): void {
    this.editProject = project;
    this.modalService.open(content).result.then((result) => {
      this.saveEditedProject(this.editProject);
    }, (reason) => {})
  }

  saveEditedProject(projectToEdit): void {
    this.projectsService.updateProject(projectToEdit).subscribe(success => {
      console.log("saveEditedProject: "+JSON.stringify(projectToEdit));
      this.projects = this.projectsService.editProject(this.projects, projectToEdit);
    }, error => {
      console.log(error);
    })

  }


}
