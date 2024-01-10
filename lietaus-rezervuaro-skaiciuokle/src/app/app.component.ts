import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Savybės, kuriose saugoma informacija apie talpyklą ir užpildymą
  reservoirCapacity: number;
  fillingRate: number;
  fillingTime: number;
  reservoirPercentage: number;

  // Pranešimas ir stilius naudotojo sąsajoje
  message: string;
  messageClass: string;

  // Vėliavos nustatyti mygtuko paspaudimui ir išjungto būsenai
  isButtonClicked: boolean = false;
  isDisabled: boolean = true;

  // Konstruktorius su numatytomis reikšmėmis
  constructor() {
    this.reservoirCapacity = 0;
    this.fillingRate = 0;
    this.fillingTime = 0;
    this.reservoirPercentage = 0;
    this.message = '';
    this.messageClass = '';
  }

  // Metodas, skirtas skaičiuoti talpyklos procentą ir suteikti naudotojo sąsajos grąžinimą
  calculatePercentage() {
    this.reservoirPercentage = (this.fillingRate * this.fillingTime) / this.reservoirCapacity * 100;
    this.isButtonClicked = true;

    // Nustatykite pranešimą ir stilių pagal procentą
    if (this.reservoirPercentage >= 100) {
      this.message = 'Rezervuaro talpa yra perpildyta!';
      this.messageClass = 'alert-danger';
    } else if (this.reservoirPercentage > 80) {
      this.message = 'Rezervuaro talpa kritiškai pripildyta!';
      this.messageClass = 'alert-warning';
    } else {
      this.message = '';
    }
  }

  // Metodas, skirtas tvarkyti įvesties pakeitimus ir valdyti mygtuko būseną
  onInputChange() {
    // Patikrinkite, ar visi įvesties laukai užpildyti, kad būtų galima įjungti / išjungti mygtuką
    this.isDisabled = !this.reservoirCapacity || !this.fillingRate || !this.fillingTime;
  }
}
