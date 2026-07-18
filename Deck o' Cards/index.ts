interface Card {
    suit: string;
    value: string;
}

interface Deck {
    cards: Card[];
    shuffle(): void;
    draw(): Card | null;
    
}

function draw(): Card | null {
    if (Deck.cards.length === 0) {
        return null; // Return null if there are no cards left in the deck
    }
    return Deck.cards.pop() || null; // Remove and return the last card from the deck, or null if the deck is empty
}

function shuffle(): void {
    for (let i = deck.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
        [deck.cards[i], deck.cards[j]] = [deck.cards[j], deck.cards[i]]; // Swap the cards at index i and j
    }
}

