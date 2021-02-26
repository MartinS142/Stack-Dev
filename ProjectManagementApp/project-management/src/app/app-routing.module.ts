import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectManagementComponent } from "./project-management/project-management.component";
import {TaskComponent} from "./task/task.component";

const routes: Routes = [
  {path: 'project-management', component: ProjectManagementComponent},
  {path: 'project-management/task', component: TaskComponent},
  {path: 'project-management/task/:id', component: TaskComponent},
  {path : 'task', component: TaskComponent},
  {
        path: 'project-management/task',
        component: TaskComponent,

        children: [
            { path: 'task/:id', component: TaskComponent }
        ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
