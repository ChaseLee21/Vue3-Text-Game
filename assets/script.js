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
            //local variables
            let map = [];
            let currentPos = [];
            let startPoint = [9, Math.floor(Math.random() * 10)];
            let endPoint = [0, Math.floor(Math.random() * 10)];
            let roomCount = 0;
            let endPointReached = false;
            let firstRoomInFinalRow = null;
            let finalRow = false;

            function findRooms(pos) {
                if (endPointReached) return [endPoint]; //ends function and returns the end room
                let y = pos[0]; //y coordinate of current position
                let x = pos[1]; //x coordinate of current position
                let rooms = []; //array of rooms that will be returned 
                if (y > 0) { //checks if there is a room above the current position
                    rooms.push([y-1, x]);
                }
                if (x > 0) { //checks if there is a room to the left of the current position
                    rooms.push([y, x-1]);
                }
                if (x < 9) { //checks if there is a room to the right of the current position
                    rooms.push([y, x+1]);
                }
                for (let room of rooms) { //itterates through the rooms array
                    if (room[0] === endPoint[0] && room[1] === endPoint[1]) { //checks if the room is the end point
                        endPointReached = true;
                        return [endPoint]; //ends function and returns the end room
                    } else if (map[room[0]][room[1]] != "x") { //checks if the room is empty
                        removeRoom(rooms, room); //removes the room from the rooms array
                    }
                }
                //validates each room
                for (let room of rooms) {
                    let roomsAllowed = 2; //number of rooms allowed in each row (not including the end row)
                    let roomy = room[0]; //y coordinate of room
                    let roomx = room[1]; //x coordinate of room

                    if (roomy == 0) { //runs if we are on the final row
                        if (!finalRow) { //runs the first time we are on the final row
                            firstRoomInFinalRow = room;
                            finalRow = true;
                            return [room];
                        } else { //runs every other time we are on the final row
                            if (calculateDistance(room, endPoint) > calculateDistance(firstRoomInFinalRow, endPoint)) { //checks if the room is further from the end point than the first room in the final row
                                removeRoom(rooms, room); //removes the room from the rooms array
                            }
                        }
                    } else { //runs if we are not on the final row
                        for (let point of map[roomy]) {
                            if (point !== "x" && point !== "s" && point !== "e") {
                                roomsAllowed--;
                            }  
                        }
                        if (roomsAllowed == 0) { 
                            removeRoom(rooms, room); //removes the room from the rooms array
                        }
                    }
                }
                return rooms; //returns the rooms array
            }

            function createRooms() {
                let rooms = findRooms(currentPos);

                if (rooms.length > 0 && !endPointReached) {
                    let room = rooms[Math.floor(Math.random() * rooms.length)];

                    map[room[0]][room[1]] = roomCount.toString();

                    roomCount++;

                    currentPos = room;

                    createRooms();

                } else if (rooms.length > 0 && endPointReached) {
                    let room = rooms[0];
                    map[room[0]][room[1]] = "end";
                } else {
                    return;
                }
            }

            function removeRoom(Rooms, room) {
                for (let i = 0; i < Rooms.length; i++) {
                    if (Rooms[i] == room) {
                        Rooms.splice(i, 1);
                    }
                }
                return Rooms;
            }

            function calculateDistance(pos1, pos2) {
                let y1 = pos1[0];
                let x1 = pos1[1];
                let y2 = pos2[0];
                let x2 = pos2[1];
                let distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
                return distance;
            }

            function createMap() {
                map = [];
                currentPos = [];
                startPoint = [9, Math.floor(Math.random() * 10)];
                 endPoint = [0, Math.floor(Math.random() * 10)];
                 roomCount = 0;
                 endPointReached = false;
                 firstRoomInFinalRow = null;
                 finalRow = false;
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
                //set current position to start position
                currentPos = startPoint;
                //generates the rooms from the start point to the end point
                createRooms();
            }
            
            function validateMap() {
                let roomCount = 0;
                //if (map has too many rooms) regenerate map
                if (roomCount > 16) {
                    console.log("too many rooms in map");
                    createMap();
                    validateMap();
                }
                //if (map end point never reached) regenerate map
                if (endPointReached == false) {
                    console.log("end point not reached");
                    createMap();
                    validateMap();
                }
                //if the amount of rooms on the same row as the end point is greater than 2 regenerate map
                for (let point of map[endPoint[0]]) {
                    console.log(point, map);
                    if (point != "x") {
                        roomCount++;
                    }
                }
                if (roomCount > 2) {
                    console.log("too many rooms on the same row as the end point");
                    createMap();
                    validateMap();
                }
                //logs the map to the console
                console.log("---------MAP---------");
                for (let i = 0; i < map.length; i++) {
                    console.log(map[i]);
                }
            }

            //creates the blank map
            createMap();

            //validates map and regenerates if needed
            validateMap();
            
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