import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@/components/card/card.component';
import { Deck } from '@/class/deck';
import { TexasDeck } from '@/class/texasDeck';
import { Hand } from '@/class/hand';
import { TexasHand } from '@/class/texasHand';

@Component({
  selector: 'app-poker',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css']
})
export class PokerComponent {
  private deck: Deck;
  protected communityCards: Hand;
  protected rivalsHands: Hand[];
  protected playerHand: Hand;
  protected disabledButtons: boolean[];
  protected faceDown: boolean[] = [true, true, true, true, true];
  protected faceUp: boolean = false;

  constructor() {
    this.disabledButtons = [false, true, false, false];
    this.deck = new TexasDeck();
    this.deck.shuffle();
    this.playerHand = new TexasHand("player 1");
    this.rivalsHands = [];
    this.communityCards = new TexasHand("communityCards");
    this.initializePlayers();
  }

  protected getFaceDown(index: number): boolean {
    return this.faceDown[index];
  }

  protected dealFlop() {
    this.faceDown[0] = false;
    this.faceDown[1] = false;
    this.faceDown[2] = false;
  }

  protected dealTurn() {
    this.faceDown[3] = false;
  }

  protected dealRiver() {
    this.faceDown[4] = false;
  }

  private initializePlayers() {
    this.deck.moveCardsToHand(this.communityCards, 5);
    this.deck.moveCardsToHand(this.playerHand, 2);
    for (let i = 0; i < 3; i++) {
      this.rivalsHands[i] = new TexasHand(`player ${i + 2}`);
      this.deck.moveCardsToHand(this.rivalsHands[i], 2);
    }
    console.log(this.communityCards);
    console.log(this.playerHand);
    console.log(this.rivalsHands);
  }
}
