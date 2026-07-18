class Card {
  constructor (value, suit){
    this.value = value;
    this.suit = suit;
  }
  toString () {    //returns a string representation of the card
    return `${this.value} of ${this.suit}`
  }
}

class Deck {                                                                
  cards = [];                                                              
  values = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];                          
  suits = ['hearts', 'diamonds', 'clubs', 'spades'];                        
  constructor(){                                                           
    for(let value of this.values) {                             
      for(let suit of this.suits) {
        const card = new Card(value, suit);
        this.cards.push(card)
      }
    }
  }
  draw(){
    return this.cards.pop();  //removes the last card from the deck and returns it
  }

  shuffle (){
    for(let i=0; i < this.cards.length; i++) {
      const temp = this.cards[i];
      const randomIndex = Math.floor(Math.random() * this.cards.length);  //generates a random index between 0 and the length of the cards array
      const randomCard = this.cards[randomIndex];

      //swap
      this.cards[i] = randomCard; //assigns the random card to the current index
      this.cards[randomIndex] = temp; //assigns the temp card to the random index
    }
  }
}

