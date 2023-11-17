const app = Vue.createApp({
    data() {
        return {
            started: false,
            title: "Js Game",
            currentEnemies: [],
            enemyObjects: [],
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
            rooms: [],
            roomCount: 0,
            roomObjects: [],
        }
    },
    mounted: function() {
        this.generateEnemyObjects();
        this.generateRoomObjects();
        this.startGame();
    },
    methods: {
        startGame() {
            //let heroName = prompt("What is your hero's name?");
            // if (heroName) {
            //     this.character.name = heroName;
            // }
            this.started = true;
            this.character.stats.Attack = this.calculateCharacterAttack();
            this.log.push("Welcome to the game!");
            this.initializeMap();
            this.initializeRooms();
            this.setRoom(this.rooms[0]);
        },
        generateEnemyObjects() {
            this.enemyObjects = [
                { //0
                name: "Slime",
                stats: {
                    Health: 20,
                    Attack: 1,
                    Defense: 0,
                    Hit: 1,
                    Poison: true,
                    Fire: true,
                },
                inventory: [
                    {
                        name: "Slime Jelly",
                    },
                ],
                },
                { //1
                    name: "Skeever",
                    stats: {
                        Health: 4,
                        Attack: .5,
                        Defense: 1
                    },
                    inventory: [
                        {
                            name: "Skeever Tail",
                        },
                    ],
                },
                { //2
                    name: "Skeleton",
                    stats: {
                        Health: 8,
                        Attack: 1,
                        Defense: 1,
                        Hit: .5,
                    },
                    inventory: [
                        {
                            name: "Skull Helmet",
                        },
                    ],
                },
                { //3
                    name: "Prisoner",
                    stats: {
                        Health: 6,
                        Attack: 1,
                        Defense: 0,
                        Hit: .5,
                        Poison: true, 
                    },
                    inventory: [
                        {
                            name: "Rusty Shank",
                        },
                    ],
                },
                { //4
                    name: "Frostbite Spider",
                    stats: {
                        Health: 4,
                        Attack: .5,
                        Defense: 0,
                        Hit: .25,
                        Poison: true, 
                    },
                    inventory: [
                        {
                            name: "Frostbite Venom",
                        },
                    ],
                },
                { //5
                    name: "Gimli",
                    stats: {
                        Health: 10,
                        Friendly: true,
                    },
                    inventory: [
                        {
                            name: "Gimli's Axe",
                        },
                        {
                            name: "Gimli's Chestplate",
                        },
                    ],
                },
                { //6
                    name: "Goblin",
                    stats: {
                        Health: 5,
                        Attack: 2,
                        Defense: 1,
                        Hit: .6,
                    },
                    inventory: [
                        {
                            name: "Goblin Bow",
                        },
                    ],
                },
                { //7
                    name: "Cleric",
                    stats: {
                        Health: 10,
                        Attack: 2,
                        Defense: 0,
                        Hit: .6,
                        Heal: 4,
                    },
                    inventory: [
                        {
                            name: "Cleric's Staff",
                        },
                        {
                            name: "Health Potion",
                        }
                    ],
                },
                { //8
                    name: "Gargoyle",
                    stats: {
                        Health: 10,
                        Attack: 2,
                        Defense: 2,
                        Hit: .7,
                    },
                    inventory: [
                        {
                            name: "Gargoyle's Sword",
                        },
                    ],
                },
                { //9
                    name: "Goblin King",
                    stats: {
                        Health: 20,
                        Attack: 4,
                        Defense: 2,
                        Hit: .8,
                        Poison: true,
                    },
                    inventory: [
                        {
                            name: "Goblin King's Chestplate",
                        },
                    ],
                },
                { //10
                    name: "Bandit",
                    stats: {
                        Health: 10,
                        Attack: 2,
                        Defense: 1,
                        Hit: .6,
                    },
                    inventory: [
                        {
                            name: "Bandit's Helmet",
                        },
                        {
                            name: "Bandit's Pantaloon's",
                        }
                    ],
                },
                { //11
                    name: "Bandit Leader",
                    stats: {
                        Health: 20,
                        Attack: 4,
                        Defense: 2,
                        Hit: .8,
                        Heal: 4,
                    },
                    inventory: [
                        {
                            name: "Bandit Leader's Sword",
                        },
                    ],
                },
                { //12
                    name: "Frostbite Spider Queen",
                    stats: {
                        Health: 30,
                        Attack: 6,
                        Defense: 2,
                        Hit: .8,
                        Poison: true,
                    },
                    inventory: [
                        {
                            name: "Frostbite Queen's Venom",
                        },
                    ],
                },
                { //13
                    name: "Possessed Villager",
                    stats: {
                        Health: 14,
                        Attack: 3,
                        Defense: 3,
                        Hit: .6,
                    },
                },
                { //14
                    name: "mysterious figure",
                    stats: {
                        Health: 10,
                        Friendly: true,
                    },
                    inventory: [
                        {
                            name: "mysterious hood",
                        },
                    ],
                },
                { //15
                    name: "Mimic",
                    stats: {
                        Health: 15,
                        Attack: 2,
                        Defense: 5,
                        Hit: .6,
                    },
                    inventory: [
                        {
                            name: "Health Potion",
                        },
                        {
                            name: "Gargoyle's Sword",
                        },
                        {
                            name: "Goblin Bow",
                        },
                        {
                            name: "Bandit's Pantaloon's",
                        },
                        {
                            name: "Skull Helmet",
                        }
                    ],
                },
                { //16
                    name: "The Dark Lord",
                    stats: {
                        Health: 100,
                        Attack: 10,
                        Defense: 10,
                        Hit: 1,
                    },
                    inventory: [
                        {
                            name: "The Dark Lord's Left Hand",
                        },
                    ],
                },
                { //17
                    name: "Demon",
                    stats: {
                        Health: 20,
                        Attack: 6,
                        Defense: 2,
                        Hit: .75,
                    },
                    inventory: [
                        {
                            name: "Health Potion",
                        },
                        {
                            name: "Demon's Helmet",
                        }
                    ],
                },
                { //18
                    name: "Lava Worm",
                    stats: {
                        Health: 20,
                        Attack: 6,
                        Defense: 2,
                        Hit: .75,
                        Fire: true,
                    },
                    inventory: [
                        {
                            name: "Lava Worm's Fang",
                        },
                    ],
                },
                { //19
                    name: "Evil Sorcerer",
                    stats: {
                        Health: 20,
                        Attack: 6,
                        Defense: 2,
                        Hit: .75,
                        Fire: true,
                        Heal: 6
                    },
                    inventory: [
                        {
                            name: "Evil Sorcerer's Robe",
                        },
                    ],
                }
            ];
        },
        generateRoomObjects() {
            this.roomObjects = [
                { //0
                    name: "The Sewers",
                    enemies: [this.enemyObjects[1]],
                    positions: [0,1,2]
                },
                { //1
                    name: "The Dungeon",
                    enemies: [this.enemyObjects[3]],
                    positions: [1,2,3]
                },
                { //2
                    name: "The Crypt",
                    enemies: [this.enemyObjects[2], this.enemyObjects[2]],
                    positions: [2,3,4]
                },
                { //3
                    name: "The Caverns",
                    enemies: [this.enemyObjects[4], this.enemyObjects[4], this.enemyObjects[4]],
                    positions: [3,4,5]
                },
                { //4
                    name: "The Catacombs",
                    enemies: [this.enemyObjects[2], this.enemyObjects[2]],
                    positions: [4,5,6]
                },
                { //5
                    name: "The Mines",
                    enemies: [this.enemyObjects[5]],
                    positions: [6,7]
                },
                { //6
                    name: "The Ruins",
                    enemies: [this.enemyObjects[6], this.enemyObjects[6], this.enemyObjects[6]],
                    positions: [5,6,7,8]
                },
                { //7
                    name: "The Temple",
                    enemies: [this.enemyObjects[7]],
                    positions: [6,7,8,9]
                },
                { //8
                    name: "The Castle",
                    enemies: [this.enemyObjects[8], this.enemyObjects[8]],
                    positions: [7,8,9]
                }, 
                { //9
                    name: "The Goblin Fortress",
                    enemies: [this.enemyObjects[6], this.enemyObjects[6], this.enemyObjects[6], this.enemyObjects[6], this.enemyObjects[9]],
                    positions: [9,10,11]
                },
                { //10
                    name: "The Bandit's Tower",
                    enemies: [this.enemyObjects[11], this.enemyObjects[3], this.enemyObjects[3], this.enemyObjects[3], this.enemyObjects[3], this.enemyObjects[3]],
                    positions: [9,10,11]
                },
                { //11
                    name: "The Spider's Nest",
                    enemies: [this.enemyObjects[12]],
                    positions: [10,11]
                },
                { //12
                    name: "The Demonic Village",
                    enemies: [this.enemyObjects[13], this.enemyObjects[13]],
                    positions: [7,8,9]
                },
                { //13
                    name: "The Overgrown Garden",
                    enemies: [this.enemyObjects[14]],
                    positions: [5,6,7,8,9]
                },
                { //14
                    name: "The Abandoned Village",
                    enemies: [this.enemyObjects[15]],
                    positions: [3,4,5,6,7]
                },
                { //15
                    name: "The Showdown",
                    enemies: [this.enemyObjects[16]],
                    positions: [12]
                },
                { //16
                    name: "The Eternal Battlefield",
                    enemies: [this.enemyObjects[17], this.enemyObjects[17]],
                    positions: [11]
                },
                { //17
                    name: "The Lava Pits",
                    enemies: [this.enemyObjects[18]],
                    positions: [11]
                },
                { //18
                    name: "A Suspicious Looking Evil Lair That You Should Probably Not Enter But You Do Anyway Because You Are A Hero And That Is What Heroes Do",
                    enemies: [this.enemyObjects[0], this.enemyObjects[0], this.enemyObjects[0]],
                    positions: [11]
                },
                { //19
                    name: "The Evil Sorcerer's Castle",
                    enemies: [this.enemyObjects[19]],
                    positions: [11]
                }   
            ];
            for (let room of this.roomObjects) {
                room.selected = false;
            }
        },
        initializeMap() {
            //local variables
            let map = [];
            let currentPos = [];
            let startPoint = [9, Math.floor(Math.random() * 10)];
            let endPoint = [0, Math.floor(Math.random() * 10)];
            let roomCount = 1;
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
                    map[room[0]][room[1]] = "e";
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
                roomCount = 1;
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
                if (roomCount > 14) {
                    createMap();
                    validateMap();
                }
                //if (map end point never reached) regenerate map
                if (endPointReached == false) {
                    createMap();
                    validateMap();
                }
                //if the amount of rooms on the same row as the end point is greater than 2 regenerate map
                for (let point of map[endPoint[0]]) {
                    if (point != "x") {
                        roomCount++;
                    }
                }
                if (roomCount > 2) {
                    createMap();
                    validateMap();
                }
                
            }

            //creates the blank map
            createMap();

            //validates map and regenerates if needed
            validateMap();
            
            //logs the map to the console
            console.log("---------MAP---------");
            for (let i = 0; i < map.length; i++) {
                console.log(map[i]);
            }

            this.map = map;
            this.roomCount = roomCount + 1;
        },
        initializeRooms() {
            let rooms = [];
            for (let i = 0; i < this.roomCount - 1; i++) { // i = room number
                let availableRooms = [];
                if (i <= 10 ) {
                    for (let room of this.roomObjects) {
                        if (room.positions.includes(i) && !room.selected) {
                            room.position = i;
                            availableRooms.push(room);
                        }
                    }
                } else if (i > 10) {
                    for (let room of this.roomObjects) {
                        if (room.positions.includes(11) && !room.selected) {
                            room.position = i;
                            availableRooms.push(room);
                        }
                    }
                }
                if (availableRooms.length > 0) {
                    let room = availableRooms[Math.floor(Math.random() * availableRooms.length)];
                    room.selected = true;
                    rooms.push(room);
                } else {
                    console.log("error: no available rooms", i);
                }
            }
            this.roomObjects[15].position = this.roomCount - 1; //sets the final room's position to the final room
            rooms.push(this.roomObjects[15]); //adds the final room to the rooms array
            for (let room of rooms) {
                console.log(room);
            }
            this.rooms = rooms;
        },
        setRoom(room) {
            this.title = room.name;
            this.currentEnemies = room.enemies;
            this.updateMap(room.position);
            this.log.unshift(`You entered ${room.name}`);
        },
        updateMap(position) {
            //TODO: implement this 
            console.log("not yet implemented, updateMap() in script.js", position);
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