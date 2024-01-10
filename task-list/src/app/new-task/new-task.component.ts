import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from '../tasks-list/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  // Įvesties laukai
  newTaskName: string = '';
  newTaskType: string = 'Skubus';

  constructor(private taskService: TaskService) {}

  // Metodas prideda naują užduotį
  addTask() {
    console.log('addTask function called');

    // Patikrina, ar pavadinimas ne tuščias
    if (this.newTaskName.trim() === '') {
      return;
    }

    // Sukuria naują užduotį per servisą
    const newTask = new Task(0, this.newTaskName, this.newTaskType);
    this.taskService.addTask(newTask);
    console.log('New task ID:', newTask.id);

    // Išvalo laukus po pridėjimo
    this.newTaskName = '';
    this.newTaskType = 'Skubus';
  }
}
