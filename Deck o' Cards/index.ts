type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'Jack' | 'Queen' | 'King' | 'Ace';

interface Card {
  suit: Suit;
  rank: Rank;
}

interface Deck {
  deck: Card[];
  shuffle(): void;
  draw(): Card | undefined;
}

class CardClass implements Card {
  suit: Suit;
  rank: Rank;

  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }

  toString() {
    return `${this.rank} of ${this.suit}`;
  }
}

class DeckClass implements Deck {
  deck: Card[];

  constructor() {
    this.deck = [];
    const ranks: Rank[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
    const suits: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

    for (const rank of ranks) {
      for (const suit of suits) {
        this.deck.push(new CardClass(suit, rank));
      }
    }
  }

  shuffle(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  draw(): Card {
    if (this.deck.length === 0) {
      console.log("The deck is empty!");
      throw new Error("Cannot draw from an empty deck");
    }
    const card = this.deck.pop();
    if (!card) {
      throw new Error("Cannot draw from an empty deck");
    }
    return card;
  }
}

const deck = new DeckClass();
deck.shuffle();

const card = deck.draw();
console.log(card.toString());