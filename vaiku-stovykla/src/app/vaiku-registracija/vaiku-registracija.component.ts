import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'app-vaiku-registracija',
  templateUrl: './vaiku-registracija.component.html',
  styleUrls: ['./vaiku-registracija.component.css']
})
export class VaikuRegistracijaComponent {
  registrationForm: FormGroup;



  constructor(private fb: FormBuilder, private http: HttpClient, private appService: AppService) {
    // Inicializuojamas formos objektas naudojant FormBuilder
    this.registrationForm = this.fb.group({
      // Formos laukai su įvesties validavimo taisyklėmis
      vaikoVardas: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-ZĄČĘĖĮŠŲŪąčęėįšųū]+$/)]],
      vaikoPavarde: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(/^[a-zA-ZĄČĘĖĮŠŲŪąčęėįšųū]+$/)]],
      gimimoMetai: ['', [Validators.required, Validators.pattern(/^\d{4}$/), this.yearValidator]],
      lytis: ['', Validators.required],
      elPastas: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/)]],
      telefonas: ['', [Validators.pattern(/^\+370[0-9]{8,9}$/), Validators.minLength(10), Validators.maxLength(12)]],
      klase: ['', [Validators.required, Validators.pattern(/^(5|6|7|8|9|10|11|12)$/)]],
    });
  }

  // gimimo metai validavimo funkcija
  yearValidator(control: AbstractControl): ValidationErrors | null {
    const dabartiniaiMetai = new Date().getFullYear();
    const ivestiMetai = parseInt(control.value, 10);

    if (isNaN(ivestiMetai) || ivestiMetai > dabartiniaiMetai || ivestiMetai < dabartiniaiMetai - 5) {
      return { validYear: true };
    }

    return null;
  }

  // Formos pateikimo metu
  onSubmit() {
    if (this.registrationForm.valid) {
      // Jei forma yra validi, išgaunama formos informacija
      const registracijosDuomenys = this.registrationForm.value;

      // Siunčiami duomenys į Firebase
      const firebaseUrl = 'https://vasaros-gamtininku-stovy-f7e6a-default-rtdb.europe-west1.firebasedatabase.app/.json';
      this.http.post(firebaseUrl, registracijosDuomenys)
        .subscribe(
          () => {
            console.log('Registracijos duomenys sėkmingai išsaugoti!');
            this.appService.emitRegistrationsUpdate();  // Siunčiamas signalas apie naujus duomenis
          },
          klaida => {
            console.error('Klaida išsaugant registracijos duomenis: ', klaida);
          }
        );
    } else {
      console.log('Forma yra nevalidi. Patikrinkite įvestus duomenis.');
    }
  }
}
