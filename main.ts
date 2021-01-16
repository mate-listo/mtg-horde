/*export*/ enum CardType {
  token = 'token',
  artifact = 'artifact',
  enchantment = 'enchantment',
  instant = 'instant',
  sorcery = 'sorcery',
  creature = 'creature'
}

/*export*/ enum CardColor {
  black = 'black',
  green = 'green',
  white = 'white',
  red = 'red',
  blue = 'blue'
}

interface AbstractCard {
  color: CardColor;
  type: CardType;
  cost: number;
  name: string;
  playFunction: string;
}

/*export*/ interface Creature extends AbstractCard {
  type: CardType.creature;
  strength: number;
  toughness: number;
}

/*export*/ interface Token extends AbstractCard {
  type: CardType.token;
  strength: number;
  toughness: number;
}
/*export*/ interface Artifact extends AbstractCard {
  type: CardType.artifact;
}
/*export*/ interface Enchantment extends AbstractCard {
  type: CardType.enchantment;
}
/*export*/ interface Instant extends AbstractCard {
  type: CardType.instant;
}
/*export*/ interface Sorcery extends AbstractCard {
  type: CardType.sorcery;
}

/*export*/ type Card = Token | Creature | Artifact | Enchantment | Instant | Sorcery;

/*export*/ class GameState {
  battlefield!: Card[];
  cemetery!: Card[];
  exile!: Card[];
  hand!: Card[];
  deck!: Card[];
}

/*export*/ class Game {
  state: GameState = new GameState();

  constructor() {}

  reset() {
    this.state.battlefield = [];
    this.state.cemetery = [];
    this.state.exile = [];
    this.state.hand = [];
    this.state.deck = [];
    this.fillDeck();
    this.shuffleDeck();
  }

  fillDeck(): void {
    for (let x = 0; x < 60; x++) {
      this.state.deck.push({
        type: CardType.token,
        name: 'Zombie',
        color: CardColor.black,
        cost: 0,
        strength: 2,
        toughness: 2,
        playFunction: 'token'
      });
    }

    for (let x = 0; x < 4; x++) {
      this.state.deck.push({
        type: CardType.creature,
        name: 'Walking Corpse',
        color: CardColor.black,
        cost: 0,
        strength: 2,
        toughness: 2,
        playFunction: 'vanillaCreature'
      });
    }

    for (let x = 0; x < 4; x++) {
      this.state.deck.push({
        type: CardType.creature,
        name: 'Undead Minotaur',
        color: CardColor.black,
        cost: 0,
        strength: 2,
        toughness: 3,
        playFunction: 'vanillaCreature'
      });
    }

    for (let x = 0; x < 4; x++) {
      this.state.deck.push({
        type: CardType.creature,
        name: 'Zombie Goliath',
        color: CardColor.black,
        cost: 0,
        strength: 4,
        toughness: 3,
        playFunction: 'vanillaCreature'
      });
    }

    for (let x = 0; x < 4; x++) {
      this.state.deck.push({
        type: CardType.creature,
        name: 'Dutiful Servants',
        color: CardColor.black,
        cost: 0,
        strength: 2,
        toughness: 5,
        playFunction: 'vanillaCreature'
      });
    }

    for (let x = 0; x < 4; x++) {
      this.state.deck.push({
        type: CardType.creature,
        name: 'Naga Eternal',
        color: CardColor.black,
        cost: 0,
        strength: 3,
        toughness: 2,
        playFunction: 'vanillaCreature'
      });
    }

    for (let x = 0; x < 4; x++) {
      this.state.deck.push({
        type: CardType.creature,
        name: 'Those Who Serve',
        color: CardColor.black,
        cost: 0,
        strength: 2,
        toughness: 4,
        playFunction: 'vanillaCreature'
      });
    }

    for (let x = 0; x < 4; x++) {
      this.state.deck.push({
        type: CardType.creature,
        name: 'Warpath Ghoul',
        color: CardColor.black,
        cost: 0,
        strength: 3,
        toughness: 2,
        playFunction: 'vanillaCreature'
      });
    }

    for (let x = 0; x < 4; x++) {
      this.state.deck.push({
        type: CardType.creature,
        name: 'Seagraf Skaab',
        color: CardColor.black,
        cost: 0,
        strength: 1,
        toughness: 3,
        playFunction: 'vanillaCreature'
      });
    }

    for (let x = 0; x < 4; x++) {
      this.state.deck.push({
        type: CardType.creature,
        name: 'Mass of Ghouls',
        color: CardColor.black,
        cost: 0,
        strength: 5,
        toughness: 3,
        playFunction: 'vanillaCreature'
      });
    }

    for (let x = 0; x < 4; x++) {
      this.state.deck.push({
        type: CardType.creature,
        name: 'Minotaur Abomination',
        color: CardColor.black,
        cost: 0,
        strength: 4,
        toughness: 6,
        playFunction: 'vanillaCreature'
      });
    }
  }

  shuffleDeck(): void {
    this.state.deck = this.state.deck.sort(() => Math.random() - 0.5);
  }

  draw(): Card {
    const card = this.state.deck.pop();
    if(card){
      return card;
    }  
    throw new Error("Dreck Empty");
  }

  startTurn() {
    const card = this.draw();
    this.state = PlayFunctions[card.playFunction](card, this.state);
    if (card.type === CardType.token) {
      this.startTurn();
    }
  }
}

/*export*/ type PlayFunction = (card: Card, state: GameState) => GameState;

/*export*/ const PlayFunctions: { [key: string]: PlayFunction } = {};

PlayFunctions['token'] = (card: Card, state: GameState) => {
  let newState = {
    ...state,
    battlefield: [...state.battlefield, card]
  };
  return newState;
};

PlayFunctions['vanillaCreature'] = (card: Card, state: GameState) => {
  let newState = {
    ...state,
    battlefield: [...state.battlefield, card]
  };
  return newState;
};

const game = new Game();
game.reset();