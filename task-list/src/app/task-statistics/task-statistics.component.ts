import { Component, OnInit } from '@angular/core';
import { TaskService } from '../new-task/task.service';

@Component({
  selector: 'app-task-statistics',
  templateUrl: './task-statistics.component.html',
  styleUrls: ['./task-statistics.component.css']
})
export class TaskStatisticsComponent implements OnInit {
  taskCounts: { [status: string]: number } = {};
  taskCountKeys: string[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.updateTaskStatistics();
    this.taskService.tasksUpdated$.subscribe(() => {
      this.updateTaskStatistics();
    });
  }

  // Atnaujina statistiką pagal esamas užduotis
  private updateTaskStatistics() {
    this.taskCounts = {}; // Išvalo esamus užduočių skaičius
    const tasks = this.taskService.getTasks(); // Gauti naujausius užduočių duomenis
    for (const task of tasks) {
      if (task.type in this.taskCounts) {
        this.taskCounts[task.type]++; // Padidina užduočių skaičių pagal tipą
      } else {
        this.taskCounts[task.type] = 1; // Sukuria naują įrašą užduočių skaičiui pagal tipą
      }
    }
    // Atnaujina masyvą raktų, kurie atitinka užduočių tipus
    this.taskCountKeys = Object.keys(this.taskCounts);
  }
}
