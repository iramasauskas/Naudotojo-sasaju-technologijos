import { Injectable } from '@angular/core';
import { Task } from '../tasks-list/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  public tasksUpdated = new BehaviorSubject<void>(undefined); // Observable, skirtas pranešti apie atnaujinimus
  tasksUpdated$ = this.tasksUpdated.asObservable(); // Observable, kurį komponentai gali stebėti
  private lastTaskId: number = 0;

  // Gražina kopiją užduočių sąrašo
  getTasks() {
    return this.tasks;
  }

  // Prideda naują užduotį į sąrašą
  addTask(task: Task) {
    // Priskiria užduotės ID ir padidina jį
    task.id = this.lastTaskId++;
    this.tasks.push(task);
    this.saveTasksToLocalStorage();
    this.tasksUpdated.next(); // Praneša komponentams apie atnaujinimus
  }

  // Redaguoja esamą užduotį
  editTask(task: Task) {
    this.saveTasksToLocalStorage();
    this.tasksUpdated.next(); // Praneša komponentams apie atnaujinimus po redagavimo
  }

  // Šalina užduotį iš sąrašo
  deleteTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
      this.tasksUpdated.next(); // Praneša komponentams apie atnaujinimus po šalinimo
    }
  }

  // Išsaugo užduotis į vietinį saugojimą (localStorage)
  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
