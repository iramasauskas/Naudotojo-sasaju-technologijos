import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskStatisticsComponent } from './task-statistics/task-statistics.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'tasks', component: TasksListComponent },
  { path: 'new-task', component: NewTaskComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    NewTaskComponent,
    TaskStatisticsComponent,
    NavbarComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
