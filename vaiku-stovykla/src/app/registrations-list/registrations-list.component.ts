import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.css'],
})
export class RegistrationsListComponent implements OnInit {
  registrations: any[] = []; // Registracijų masyvas
  editModeIndex: number | null = null; // Redagavimo režimo indeksas arba null, jei neaktyvuotas
  editedRegistration: any = {}; // Objektas saugoti pakeitimus redagavimo metu


  constructor(private http: HttpClient, private appService: AppService) {}

  ngOnInit() {
    this.fetchRegistrations();
    this.appService.registrationsUpdated.subscribe(() => {
      this.fetchRegistrations();  // Perkrauti registracijas gavus signalą iš serviso
    });
  }

  fetchRegistrations() {
    const firebaseUrl = 'https://vasaros-gamtininku-stovy-f7e6a-default-rtdb.europe-west1.firebasedatabase.app/.json';
    this.http.get(firebaseUrl)
      .subscribe(
        (data: any) => {
          console.log('Gauti duomenys iš Firebase:', data);
          if (data) {
            // Konvertuoti gautus Firebase duomenis į masyvą su pridėtais identifikatoriaus raktais
            this.registrations = Object.keys(data).map(key => ({ id: key, ...data[key] }));
          }
        },
        error => {
          console.error('Klaida gaunant registracijas: ', error);
        }
      );
  }

  editRegistration(index: number) {
    this.editModeIndex = index;
    // Sukurti kopiją registracijos redagavimui
    this.editedRegistration = { ...this.registrations[index] };
  }

  saveRegistration(index: number) {
    // Atnaujinti registraciją masyve
    this.registrations[index] = { ...this.editedRegistration };

    // Atnaujinti duomenis Firebase
    const firebaseUrl = `https://vasaros-gamtininku-stovy-f7e6a-default-rtdb.europe-west1.firebasedatabase.app/${this.registrations[index].id}.json`;
    this.http.put(firebaseUrl, this.editedRegistration)
      .subscribe(
        (data: any) => {
          console.log('Sėkmingai atnaujinti duomenys Firebased:', data);
        },
        error => {
          console.error('Klaida atnaujinant duomenis Firebased: ', error);
        }
      );

    // Atstatyti redagavimo režimą
    this.editModeIndex = null;
  }

  deleteRegistration(index: number) {
    // Pašalinti registraciją iš masyvo
    const registrationId = this.registrations[index].id;
    this.registrations.splice(index, 1);

    // Ištrinti duomenis iš Firebase
    const firebaseUrl = `https://vasaros-gamtininku-stovy-f7e6a-default-rtdb.europe-west1.firebasedatabase.app/${registrationId}.json`;
    this.http.delete(firebaseUrl)
      .subscribe(
        (data: any) => {
          console.log('Sėkmingai ištrinti duomenys iš Firebased:', data);
        },
        error => {
          console.error('Klaida ištrinant duomenis iš Firebased: ', error);
        }
      );
  }

  cancelEdit() {
    // Atšaukti redagavimo režimą
    this.editModeIndex = null;
  }
}
