import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatisticsComponent } from './task-statistics.component';

describe('TaskStatisticsComponent', () => {
  let component: TaskStatisticsComponent;
  let fixture: ComponentFixture<TaskStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskStatisticsComponent]
    });
    fixture = TestBed.createComponent(TaskStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
