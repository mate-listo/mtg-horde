"use strict";
/*export*/ var CardType;
(function (CardType) {
    CardType["token"] = "token";
    CardType["artifact"] = "artifact";
    CardType["enchantment"] = "enchantment";
    CardType["instant"] = "instant";
    CardType["sorcery"] = "sorcery";
    CardType["creature"] = "creature";
})(CardType || (CardType = {}));
/*export*/ var CardColor;
(function (CardColor) {
    CardColor["black"] = "black";
    CardColor["green"] = "green";
    CardColor["white"] = "white";
    CardColor["red"] = "red";
    CardColor["blue"] = "blue";
})(CardColor || (CardColor = {}));
/*export*/ class GameState {
}
/*export*/ class Game {
    constructor() {
        this.state = new GameState();
    }
    reset() {
        this.state.battlefield = [];
        this.state.cemetery = [];
        this.state.exile = [];
        this.state.hand = [];
        this.state.deck = [];
        this.fillDeck();
        this.shuffleDeck();
    }
    fillDeck() {
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
    shuffleDeck() {
        this.state.deck = this.state.deck.sort(() => Math.random() - 0.5);
    }
    draw() {
        const card = this.state.deck.pop();
        if (card) {
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
/*export*/ const PlayFunctions = {};
PlayFunctions['token'] = (card, state) => {
    let newState = {
        ...state,
        battlefield: [...state.battlefield, card]
    };
    return newState;
};
PlayFunctions['vanillaCreature'] = (card, state) => {
    let newState = {
        ...state,
        battlefield: [...state.battlefield, card]
    };
    return newState;
};
const game = new Game();
game.reset();
