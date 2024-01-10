import { Component, OnInit } from '@angular/core';
import { FrankfurterService } from '../frankfurter.service';

@Component({
  selector: 'app-valiutu-kursai',
  templateUrl: './valiutu-kursai.component.html',
  styleUrls: ['./valiutu-kursai.component.css']
})
export class ValiutuKursaiComponent implements OnInit {
  isKraunama: boolean = false;
  klaida: string = '';
  valiutos: any[] = [];
  selectedFromCurrency: string = '';
  selectedToCurrency: string = '';
  valiutosKursas: number | undefined;

  constructor(private frankfurterService: FrankfurterService) {}

  ngOnInit(): void {
    // Krauname valiutas vieną kartą, kai komponentas inicijuojamas
    this.gautiValiutas();
  }

  gautiValiutas(): void {
    // Užkrauname valiutas iš Frankfurter API
    this.frankfurterService.getCurrencies().subscribe(
      data => {
        this.valiutos = Object.keys(data);
      },
    );
  }

  gautiKursa(): void {
    // Tikriname, ar pasirinktos pradinė ir tikslinė valiutos
    if (this.selectedFromCurrency && this.selectedToCurrency) {
      this.isKraunama = true;
      this.klaida = '';

      // Siunčiame užklausą gauti valiutos kursą iš Frankfurter API
      this.frankfurterService.getExchangeRate(this.selectedFromCurrency, this.selectedToCurrency).subscribe(
        data => {
          this.valiutosKursas = data.rates[this.selectedToCurrency];
          this.isKraunama = false;
        },
        error => {
          this.klaida = 'Įvyko klaida gaudant valiutos kursą.';
          this.isKraunama = false;
        }
      );
    }
  }
}
