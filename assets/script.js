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
            map: null,
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
            log: [],
        }
    },
    mounted: function() {
        this.initializeMap();
    },
    methods: {
        startGame() {
            let heroName = prompt("What is your hero's name?");
            if (heroName) {
                this.character.name = heroName;
            }
            this.started = true;
            this.character.stats.Attack = this.calculateCharacterAttack();
            this.log.push("Welcome to the game!");
            this.currentEnemies.push(this.enemies[0]);
            this.title = "Room 1"
            //TODO: add initial map
        },
        initializeMap() {
            //TODO: add map initialization
            //the map will have a start point and an end point with a minimum number of rooms in between
            //the player will be able to see the rooms they have already visited on the map
            //the player will not be able to see the rooms they have not visited on the map
            //the player will be able to see the room they are currently in on the map and the rooms adjacent to it
            //the room positions will be randomly generated but the map will always be solvable
            //the user navigates the map by moving from room to room
            //in each room the player will be able to choose which direction to go only if there is a room in that direction
            //the map will be pre generated but randomly generated each time the game is started
            //the map will be a 2d array

            //local variables
            let map = [];
            let currentPos = [];
            let lastPos = [];
            let possibleRooms = [];
            let startPoint = [9, Math.floor(Math.random() * 10)];
            let endPoint = [0, Math.floor(Math.random() * 10)];
            let adjacentEndPoints = [];
            let roomCount = 0;
            let endPointReached = false;
            let firstRoomInFinalRow = true;
            let closestRoom = null;

            //function definitions
            function getPossibleRooms(pos) {
                //using the passed position, checks rooms adjacent to it and returns an array of rooms that are not already rooms
                let y = pos[0];
                let x = pos[1];
                let adjacentRooms = [];
                let rooms = [];
                //check above
                if (y > 0) {
                    adjacentRooms.push([y-1, x]);
                }
                //check to the left
                if (x > 0) {
                    adjacentRooms.push([y, x-1]);
                }
                //check to the right
                if (x < 9) {
                    adjacentRooms.push([y, x+1]);
                }
                //check to see if adjacent rooms are already rooms
                for (let room of adjacentRooms) {
                    if (map[room[0]][room[1]] == "x") {
                        rooms.push(room);
                    }
                }
                //return an array of adjacent rooms that match the criteria
                return rooms;
            }

            function validateRooms(rooms) {
                let validRooms = [];
                for (let room of rooms) {
                    let roomsInRow = 0;
                    let y = room[0];
                    let x = room[1];

                    if ((x == endPoint[1] + 1 || x == endPoint[1] - 1 || x == endPoint[1]) && y == 0) { //checks if we have reached the end point
                        endPointReached = true;
                        validRooms = [];
                        validRooms.push(room);
                        console.log("end point reached");
                        return validRooms;
                    }

                    if (y == 0) { //runs if we are on the final row
                        if (firstRoomInFinalRow) {
                            closestRoom = room;
                            validRooms.push(room);
                            firstRoomInFinalRow = false;
                        } else {
                            if (Math.abs(x - endPoint[1]) < Math.abs(closestRoom[1] - endPoint[1])) {
                                closestRoom = room;
                                validRooms.push(room);
                            }
                        }
                    } else { //runs if we are not on the final row
                        for (let point of map[y]){
                            if (point !== "x" && point !== "s" && point !== "e") {
                                roomsInRow++;
                            }
                        }
                        if (roomsInRow < 2) {
                            validRooms.push(room);
                        }
                    }
                }

                //returns validRooms[]
                return validRooms;
            }

            function createRooms() {
                //gets the possible rooms from the current position and sends them to validateRooms()
                //TODO: combine getPossibleRooms() and validateRooms() into one function that returns an array of valid rooms
                let validRooms = validateRooms(getPossibleRooms(currentPos)); // return an array of valid rooms

                if (validRooms.length > 0) {
                    let room = validRooms[Math.floor(Math.random() * validRooms.length)];

                    map[room[0]][room[1]] = roomCount.toString();

                    roomCount++;

                    lastPos = currentPos;

                    currentPos = room;

                    //calls the function again if the end point has not been reached
                    if (!endPointReached) {
                        createRooms();
                    }

                } else {
                    //TODO: add backtracking
                    return;
                }
            }

            //Set the global map variable to a 2d array of 0s that is 10x10
            for (let i = 0; i < 10; i++) {
                map.push([]);
                for (let j = 0; j < 10; j++) {
                    map[i].push("x");
                }
            }

            //set start point to random position in last row
            map[startPoint[0]][startPoint[1]] = "s";

            //set end point to random position in first row
            map[endPoint[0]][endPoint[1]] = "e";

            //set adjacent end points to adjacent rooms of the end point
            adjacentEndPoints = getPossibleRooms(endPoint);

            //set current position to start position
            currentPos = startPoint;

            //creates the rooms in the map
            //TODO: add conditions to regenerate map if it is not solvable or too long
            createRooms();
            
            //logs the map to the console
            console.log("---------MAP---------");
            for (let i = 0; i < map.length; i++) {
                console.log(map[i]);
            }
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
            this.log.unshift(`${this.character.name} attacked ${enemy.name} for ${this.character.stats.Attack} damage!`);
            if (enemy.stats.Health <= 0) {
                this.log.unshift(`${enemy.name} died!`);
                this.currentEnemies.splice(this.currentEnemies.indexOf(enemy), 1);
            } else {
                this.attackCharacter(enemy);
            }
        },
        attackCharacter(enemy) {
            this.character.stats.Health -= enemy.stats.Attack;
            this.log.unshift(`${enemy.name} attacked ${this.character.name} for ${enemy.stats.Attack} damage!`);
            if (this.character.stats.Health <= 0) {
                this.log.unshift(`${this.character.name} died!`);
                this.started = false;
                //TODO: add game over screen
            }
        },
        
    }
})
app.mount('#app');