import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnChanges {
  @Input() suit: string = '';  // 'C', 'D', 'H', 'S'
  @Input() value: string = ''; // 'A', '2', '3'...'10', 'J', 'Q', 'K'
  @Input() faceDown: boolean = false;
  @Input() interactive: boolean = false;
  @Input() backStyle: string = 'blue_back'; // Opciones: blue_back, red_back, green_back, etc.

  // Para establecer una imagen directamente (opcional)
  @Input() imagePath: string = '';

  imageError: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    // Resetear error de imagen cuando cambian los inputs
    if (changes['suit'] || changes['value'] || changes['faceDown'] || changes['imagePath']) {
      this.imageError = false;
    }

    // Log para debug
    console.log('Card component inputs:', {
      suit: this.suit,
      value: this.value,
      faceDown: this.faceDown,
      imagePath: this.imagePath,
      calculatedPath: this.cardImagePath
    });
  }

  get cardImagePath(): string {
    // Si se proporciona una ruta directa, usarla
    if (this.imagePath) {
      return this.imagePath;
    }

    if (this.faceDown) {
      return `assets/images/${this.backStyle}.png`;
    }

    if (this.suit && this.value) {
      return `assets/images/${this.value}${this.suit}.png`;
    }

    return `assets/images/${this.backStyle}.png`;
  }

  get cardAlt(): string {
    if (this.faceDown) {
      return 'Card Back';
    }

    const suitNames: Record<string, string> = {
      'C': 'Clubs',
      'D': 'Diamonds',
      'H': 'Hearts',
      'S': 'Spades'
    };

    const valueName = this.getValueName();
    const suitName = suitNames[this.suit] || this.suit;

    return `${valueName} of ${suitName}`;
  }

  private getValueName(): string {
    const valueNames: Record<string, string> = {
      'A': 'Ace',
      'J': 'Jack',
      'Q': 'Queen',
      'K': 'King'
    };

    return valueNames[this.value] || this.value;
  }

  handleImageError(event: any): void {
    console.error('Error loading card image:', this.cardImagePath);
    this.imageError = true;
  }
}
