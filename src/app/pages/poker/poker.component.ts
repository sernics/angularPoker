import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@/components/card/card.component';

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
})
export class PokerComponent implements OnInit, AfterViewInit {
  // Datos de ejemplo para mostrar el diseño
  playerName: string = 'Player 1';
  playerChips: number = 1000;
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

  pot: number = 150;
  currentBet: number = 20;

  opponents = [
    { name: 'Player 2', chips: 850, bet: 20 },
    { name: 'Player 3', chips: 1200, bet: 20 },
    { name: 'Player 4', chips: 930, bet: 0, folded: true }
  ];

  constructor() {}

  ngOnInit(): void {
    // Aquí conectarías con tu servicio que contiene la lógica del juego
    console.log('PokerComponent initialized');
    this.checkImagesAvailability();
  }

  ngAfterViewInit(): void {
    // Verificar si las imágenes están disponibles después de que el DOM se renderice
    setTimeout(() => {
      console.log('Checking images availability after view init');
      this.checkImagesAvailability();
    }, 1000);
  }

  // Función para verificar si las imágenes están disponibles
  checkImagesAvailability(): void {
    console.log('Checking cards images paths:');

    const testPaths = [
      'assets/images/AH.png',
      'assets/images/KS.png',
      'assets/images/10D.png',
      'assets/images/blue_back.png'
    ];

    testPaths.forEach(path => {
      const img = new Image();
      img.onload = () => console.log(`✅ Image loaded successfully: ${path}`);
      img.onerror = () => console.error(`❌ Failed to load image: ${path}`);
      img.src = path;
    });
  }

  emptySpotsArray(): number[] {
    return this.emptySpots.map((_, i) => i);
  }
}
