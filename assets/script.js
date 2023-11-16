const app = Vue.createApp({
    data() {
        return {
            started: false,
            title: "Js Game",
            currentEnemies: [
                
            ],
            enemies: [
                {
                    name: "Slime",
                    stats: {
                        Health: 4,
                        Attack: 1,
                        Defense: 0
                    },
                    inventory: [
                        {
                            name: "Slime Jelly",
                        },
                    ],
                }
            ],
            map: 
`   
            #
`
            ,
            character: {
                name: "Hero",
                stats: {
                    Health: 100,
                    Attack: 0,
                    Defense: 10
                },
                inventory: [
                    {
                        name: "Copper Short Sword",
                        attack: 1
                    },
                ],
            },
            log: [
            ],
        }
    },
    methods: {
        startGame() {
            let heroName = prompt("What is your hero's name?");
            if (heroName) {
                this.character.name = heroName;
            }
            this.started = true;
            this.character.stats.Attack = this.calculateCharacterAttack();
            console.log(this.character.stats.Attack);
            this.log.push("Welcome to the game!");
            this.currentEnemies.push(this.enemies[0]);
            this.title = "Room 1"
            //TODO: add initial map
        },
        calculateCharacterAttack() {
            //TODO: refactor this for use with enemies as well
            let attack = this.character.stats.Attack;
            for (let item of this.character.inventory) {
                if (item.attack) {
                    attack += item.attack;
                }
            }
            return attack;
        },
        attackEnemy(enemy) {
            enemy.stats.Health -= this.character.stats.Attack;
            this.log.push(`${this.character.name} attacked ${enemy.name} for ${this.character.stats.Attack} damage!`);
            if (enemy.stats.Health <= 0) {
                this.log.push(`${enemy.name} died!`);
                this.currentEnemies.splice(this.currentEnemies.indexOf(enemy), 1);
            } else {
                this.attackCharacter(enemy);
            }
        },
        attackCharacter(enemy) {
            this.character.stats.Health -= enemy.stats.Attack;
            this.log.push(`${enemy.name} attacked ${this.character.name} for ${enemy.stats.Attack} damage!`);
            if (this.character.stats.Health <= 0) {
                this.log.push(`${this.character.name} died!`);
                this.started = false;
                //TODO: add game over screen
            }
        },
        
    }
})
app.mount('#app');