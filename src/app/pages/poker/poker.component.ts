import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@/components/card/card.component';
// import { Card } from '@/class/card';

interface Card {
  suit: string;
  value: string;
  imgPath?: string; // Opcional: ruta directa a la imagen
}

@Component({
  selector: 'app-poker',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css']
})
export class PokerComponent {
  // Datos de ejemplo para mostrar el diseño
  playerName: string = 'Player 1';
  playerHand: Card[] = [
    { suit: 'H', value: 'A', imgPath: 'assets/images/AH.png' },
    { suit: 'S', value: 'K', imgPath: 'assets/images/KS.png' }
  ];

  communityCards: Card[] = [
    { suit: 'D', value: '10', imgPath: 'assets/images/10D.png' },
    { suit: 'C', value: 'J', imgPath: 'assets/images/JC.png' },
    { suit: 'H', value: 'Q', imgPath: 'assets/images/QH.png' }
  ];

  // Para mostrar espacios de cartas que aún no se han revelado
  emptySpots: number[] = [1, 2]; // Para turn y river

  opponents = [
    { name: 'Player 2', chips: 850, bet: 20 },
    { name: 'Player 3', chips: 1200, bet: 20 },
    { name: 'Player 4', chips: 930, bet: 0, folded: true }
  ];

  constructor() {
  }

  emptySpotsArray(): number[] {
    return this.emptySpots.map((_, i) => i);
  }
}
