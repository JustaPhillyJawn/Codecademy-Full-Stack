interface Player {
    name: string;
    playerType: string;
    weapon: null | Weapon;
}

interface Weapon {
    name: string;
    attackPower: number;
}

class PlayerClass implements Player {           // Implementing the Player interface and glueing the properties together
    name: string;
    playerType: string;
    weapon: null | Weapon = null;       // Initializing the weapon property to null by default

    constructor(name: string, playerType: string, weapon: null | Weapon) {      // Constructor to initialize the properties of the PlayerClass
        this.name = name;
        this.playerType = playerType;
        this.weapon = weapon;
    }
}

function fight(player1: Player, player2: Player){      // Function to simulate a fight between two players
    if (player1.weapon && player2.weapon) {      // Checking if both players have weapons
        const player1Attack = player1.weapon.attackPower;      // Getting the attack power of player1's weapon
        const player2Attack = player2.weapon.attackPower;      // Getting the attack power of player2's weapon

        if (player1Attack > player2Attack) {
            return console.log(`${player1.name} wins the fight!`);
        } 
        if (player1Attack < player2Attack) {
            return console.log(`${player2.name} wins the fight!`);
        }
        return console.log("The fight ends in a draw!");
    } 
    return console.log("One or both players are weaponless!");
}

const player1 = new PlayerClass("John", "Warrior", { name: "Sword", attackPower: 50 });      // Creating a new instance of PlayerClass with a weapon
const player2 = new PlayerClass("Jane", "Archer", null);      // Creating a new instance of PlayerClass without a weapon

console.log(player1);      // Logging the player1 object to the console
console.log(player2);      // Logging the player2 object to the console

fight(player1, player2);      // Calling the fight function with player1 and player2 as arguments


