import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  registrationsUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  emitRegistrationsUpdate() {
    this.registrationsUpdated.emit();
  }
}
