import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from '../new-task/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  editingTask: Task | null = null;

  // Konstruktorius, priimantis TaskService priklausomybę
  constructor(public taskService: TaskService) {
    // Tikriname, ar yra išsaugotų užduočių lokaliniame saugojime
    const savedTasksString = localStorage.getItem('tasks');
    if (savedTasksString !== null && savedTasksString !== '[]') {
      const savedTasks = JSON.parse(savedTasksString);
      if (Array.isArray(savedTasks)) {
        savedTasks.forEach((task: Task) => {
          if (!this.taskService.getTasks().some(t => t.text === task.text)) {
            this.taskService.addTask(task);
          }
        });
        this.saveTasksToLocalStorage();
      }
    } else {
      // Jei nėra išsaugotų užduočių, pridedame pavyzdines
      this.taskService.addTask(new Task(0, 'Išnešti šiukšles', 'Skubus'));
      this.taskService.addTask(new Task(0, 'Išvalyti kambarius', 'Rutininis'));
      // Išsaugome pavyzdines užduotis lokaliniame saugojime
      this.saveTasksToLocalStorage();
    }

    // Užsiprenumeruojame tasksUpdated įvykį iš TaskService
    this.taskService.tasksUpdated.subscribe(() => {
      this.tasks = this.taskService.getTasks();
      this.saveTasksToLocalStorage();
    });
  }

  // OnInit gyvenimo ciklo metodas, iškviečiamas komponento inicializavimo metu
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  // Metodas naudojamas šalinti užduotį
  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }

  // Metodas naudojamas pradėti užduoties redagavimą
  editTask(task: Task) {
    this.editingTask = task;
  }

  // Metodas naudojamas išsaugoti redaguojamą užduotį
  saveTask(event: any, task: Task) {
    event.preventDefault();
    if (this.editingTask) {
      this.taskService.editTask(this.editingTask);
      this.editingTask = null;
    }
  }

  // Metodas naudojamas atšaukti užduoties redagavimą
  cancelEdit() {
    this.editingTask = null;
  }

  // Privatus metodas išsaugoti užduotis į lokalų saugojimą
  private saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
