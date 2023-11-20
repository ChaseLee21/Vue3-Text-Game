const app = Vue.createApp({
  data() {
    return {
      started: false,
      title: "Js Game",
      currentEnemies: [],
      enemyObjects: [],
      map: null,
      mapDisplay: ``,
      character: {
        name: "Hero",
        stats: {
          Health: 100,
          Attack: 0,
          Defense: 0,
          Poison: {
            active: false,
            damage: 0,
            length: 0,
          }
        },
        equipment: {
          weapon: {
            name: "Copper Short Sword",
            attack: 1,
          },
          helm: {
            name: "Tattered Cap",
            defense: 1,
          },
          chestplate: {
            name: "Tattered Shirt",
            defense: 1,
          },
          pants: {
            name: "Tattered Pants",
            defense: 1,
          }
        },
        inventory: [],
      },
      log: [],
      rooms: [],
      roomCount: 0,
      roomObjects: [],
    };
  },
  mounted: function () {
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
      this.calculateCharacterStats();
      this.log.push("Welcome to the game!");
      this.initializeMap();
      this.initializeRooms();
      this.setRoom(this.rooms[0]);
    },
    generateEnemyObjects() {
      // Enemy class
      class Enemy {
        constructor(name, stats, inventory) {
          this.name = name;
          this.stats = stats;
          this.inventory = inventory;
          this.alive = true;
        }
      }
      // assigns enemy objects to enemyObjects array
      this.enemyObjects = [
        new Enemy( //0
          "Slime",
          {
            Health: 20,
            Attack: 1,
            Defense: 0,
            Hit: 1,
            Poison: true,
            Fire: true,
          },
          [
            {
              name: "Slime Jelly",
            },
          ]
        ),
        new Enemy( //1
          "Skeever",
          {
            Health: 4,
            Attack: 0.5,
            Defense: 1,
          },
          [
            {
              type: "potion",
              name: "Skeever Tail",
              heal: 2,
            },
          ]
        ),
        new Enemy( //2
          "Skeleton",
          {
            Health: 8,
            Attack: 1,
            Defense: 1,
            Hit: 0.5,
          },
          [
            {
              type: "helm",
              name: "Skull Helmet",
              defense: 2,
            },
          ]
        ),
        new Enemy(
          "Prisoner",
          {
            Health: 6,
            Attack: 1,
            Defense: 0,
            Hit: 0.5,
            Poison: true,
          },
          [
            {
              type: "weapon",
              name: "Rusty Shank",
              attack: 2,
            },
          ],
        ),
        new Enemy(
          //4
          "Frostbite Spider",
          {
            Health: 4,
            Attack: 0.5,
            Defense: 0,
            Hit: 0.25,
            Poison: true,
          },
          [
            {
              type: "potion",
              name: "Frostbite Venom",
              poison: [2, 2]
            },
          ],
        ),
        new Enemy(
          //5
          "Gimli",
          {
            Health: 10,
            Friendly: true,
          },
          [
            {
              type: "weapon",
              name: "Gimli's Axe",
              attack: 4,
            },
            {
              type: "chestplate",
              name: "Gimli's Chestplate",
              defense: 4,
            },
          ],
        ),
        new Enemy(
          //6
          "Goblin",
          {
            Health: 5,
            Attack: 2,
            Defense: 1,
            Hit: 0.6,
          },
          [
            {
              name: "Goblin Bow",
            },
          ],
        ),
        new Enemy(
          //7
          "Cleric",
          {
            Health: 10,
            Attack: 2,
            Defense: 0,
            Hit: 0.6,
            Heal: 4,
          },
          [
            {
              name: "Cleric's Staff",
            },
            {
              name: "Health Potion",
            },
          ],
        ),
        new Enemy(
          //8
          "Gargoyle",
          {
            Health: 10,
            Attack: 2,
            Defense: 2,
            Hit: 0.7,
          },
          [
            {
              name: "Gargoyle's Sword",
            },
          ],
        ),
        new Enemy(
          //9
          "Goblin King",
          {
            Health: 20,
            Attack: 4,
            Defense: 2,
            Hit: 0.8,
            Poison: true,
          },
          [
            {
              name: "Goblin King's Chestplate",
            },
          ],
        ),
        new Enemy(
          //10
          "Bandit",
          {
            Health: 10,
            Attack: 2,
            Defense: 1,
            Hit: 0.6,
          },
          [
            {
              name: "Bandit's Helmet",
            },
            {
              name: "Bandit's Pantaloon's",
            },
          ],
        ),
        new Enemy(
          //11
          "Bandit Leader",
          {
            Health: 20,
            Attack: 4,
            Defense: 2,
            Hit: 0.8,
            Heal: 4,
          },
          [
            {
              name: "Bandit Leader's Sword",
            },
          ],
        ),
        new Enemy(
          //12
          "Frostbite Spider Queen",
          {
            Health: 30,
            Attack: 6,
            Defense: 2,
            Hit: 0.8,
            Poison: true,
          },
          [
            {
              name: "Frostbite Queen's Venom",
            },
          ],
        ),
        new Enemy(
          //13
          "Possessed Villager",
          {
            Health: 14,
            Attack: 3,
            Defense: 3,
            Hit: 0.6,
          },
        ),
        new Enemy(
          //14
          "mysterious figure",
          {
            Health: 10,
            Friendly: true,
          },
          [
            {
              name: "mysterious hood",
            },
          ],
        ),
        new Enemy(
          //15
          "Mimic",
          {
            Health: 15,
            Attack: 2,
            Defense: 5,
            Hit: 0.6,
          },
          [
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
            },
          ],
        ),
        new Enemy(
          //16
          "The Dark Lord",
          {
            Health: 100,
            Attack: 10,
            Defense: 10,
            Hit: 1,
          },
          [
            {
              name: "The Dark Lord's Left Hand",
            },
          ],
        ),
        new Enemy(
          //17
          "Demon",
          {
            Health: 20,
            Attack: 6,
            Defense: 2,
            Hit: 0.75,
          },
          [
            {
              name: "Health Potion",
            },
            {
              name: "Demon's Helmet",
            },
          ],
        ),
        new Enemy(
          //18
          "Lava Worm",
          {
            Health: 20,
            Attack: 6,
            Defense: 2,
            Hit: 0.75,
            Fire: true,
          },
          [
            {
              name: "Lava Worm's Fang",
            },
          ],
        ),
        new Enemy(
          //19
          "Evil Sorcerer",
          {
            Health: 20,
            Attack: 6,
            Defense: 2,
            Hit: 0.75,
            Fire: true,
            Heal: 6,
          },
          [
            {
              name: "Evil Sorcerer's Robe",
            },
          ],
        ),
      ];
      for (let enemy of this.enemyObjects) {
        enemy.alive = true;
      }
    },
    generateRoomObjects() {
      // Room class
      class Room {
        constructor(name, enemies, positions) {
          this.name = name;
          this.enemies = enemies;
          this.positions = positions;
          this.selected = false;
        }
      }
      // assigns room objects to roomObjects array
      this.roomObjects = [
        new Room(
          //0
          "The Sewers",
          [this.enemyObjects[1]],
          [0, 1, 2],
        ),
        new Room(
          //1
          "The Dungeon",
          [this.enemyObjects[3]],
          [1, 2, 3],
        ),
        new Room(
          //2
          "The Crypt",
          [this.enemyObjects[2], this.enemyObjects[2]],
          [2, 3, 4],
        ),
        new Room(
          //3
          "The Caverns",
          [
            this.enemyObjects[4],
            this.enemyObjects[4],
            this.enemyObjects[4],
          ],
          [3, 4, 5],
        ),
        new Room(
          //4
          "The Catacombs",
          [this.enemyObjects[2], this.enemyObjects[2]],
          [4, 5, 6],
        ),
        new Room(
          //5
          "The Mines",
          [this.enemyObjects[5]],
          [6, 7],
        ),
        new Room(
          //6
          "The Ruins",
          [
            this.enemyObjects[6],
            this.enemyObjects[6],
            this.enemyObjects[6],
          ],
          [5, 6, 7, 8],
        ),
        new Room(
          //7
          "The Temple",
          [this.enemyObjects[7]],
          [6, 7, 8, 9],
        ),
        new Room(
          //8
          "The Castle",
          [this.enemyObjects[8], this.enemyObjects[8]],
          [7, 8, 9],
        ),
        new Room(
          //9
          "The Goblin Fortress",
          [
            this.enemyObjects[6],
            this.enemyObjects[6],
            this.enemyObjects[6],
            this.enemyObjects[6],
            this.enemyObjects[9],
          ],
          [9, 10, 11],
        ),
        new Room(
          //10
          "The Bandit's Tower",
          [
            this.enemyObjects[11],
            this.enemyObjects[3],
            this.enemyObjects[3],
            this.enemyObjects[3],
            this.enemyObjects[3],
            this.enemyObjects[3],
          ],
          [9, 10, 11],
        ),
        new Room(
          //11
          "The Spider's Nest",
          [this.enemyObjects[12]],
          [10, 11],
        ),
        new Room(
          //12
          "The Demonic Village",
          [this.enemyObjects[13], this.enemyObjects[13]],
          [7, 8, 9],
        ),
        new Room(
          //13
          "The Overgrown Garden",
          [this.enemyObjects[14]],
          [5, 6, 7, 8, 9],
        ),
        new Room(
          //14
          "The Abandoned Village",
          [this.enemyObjects[15]],
          [3, 4, 5, 6, 7],
        ),
        new Room(
          //15
          "The Showdown",
          [this.enemyObjects[16]],
          [12],
        ),
        new Room(
          //16
          "The Eternal Battlefield",
          [this.enemyObjects[17], this.enemyObjects[17]],
          [11],
        ),
        new Room(
          //17
          "The Lava Pits",
          [this.enemyObjects[18]],
          [11],
        ),
        new Room(
          //18
          "A Suspicious Looking Evil Lair That You Should Probably Not Enter But You Do Anyway Because You Are A Hero And That Is What Heroes Do",
          [
            this.enemyObjects[0],
            this.enemyObjects[0],
            this.enemyObjects[0],
          ],
          [11],
        ),
        new Room(
          //19
          "The Evil Sorcerer's Castle",
          [this.enemyObjects[19]],
          [11],
        ),
      ];
      for (let room of this.roomObjects) {
        room.selected = false;
      }
    },
    initializeMap() {
      //generates a 10x10 2D array of x's and sets the start and end points
      //then generates random points that connect the start and end points
      //it then validates the map and regenerates it if needed
      //once finished, it saves the map to the global map variable which i used for room generation

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
        if (y > 0) {
          //checks if there is a room above the current position
          rooms.push([y - 1, x]);
        }
        if (x > 0) {
          //checks if there is a room to the left of the current position
          rooms.push([y, x - 1]);
        }
        if (x < 9) {
          //checks if there is a room to the right of the current position
          rooms.push([y, x + 1]);
        }
        for (let room of rooms) {
          //itterates through the rooms array
          if (room[0] === endPoint[0] && room[1] === endPoint[1]) {
            //checks if the room is the end point
            endPointReached = true;
            return [endPoint]; //ends function and returns the end room
          } else if (map[room[0]][room[1]] != "x") {
            //checks if the room is empty
            removeRoom(rooms, room); //removes the room from the rooms array
          }
        }
        //validates each room
        for (let room of rooms) {
          let roomsAllowed = 2; //number of rooms allowed in each row (not including the end row)
          let roomy = room[0]; //y coordinate of room
          let roomx = room[1]; //x coordinate of room

          if (roomy == 0) {
            //runs if we are on the final row
            if (!finalRow) {
              //runs the first time we are on the final row
              firstRoomInFinalRow = room;
              finalRow = true;
              return [room];
            } else {
              //runs every other time we are on the final row
              if (
                calculateDistance(room, endPoint) >
                calculateDistance(firstRoomInFinalRow, endPoint)
              ) {
                //checks if the room is further from the end point than the first room in the final row
                removeRoom(rooms, room); //removes the room from the rooms array
              }
            }
          } else {
            //runs if we are not on the final row
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
        let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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
      //generates the rooms after the map is created
      //each room object has a position property, this property is used to determine where the room can be on the map
      //ex. if the room has a position property of [3,4,5] then the room can be room #3, #4, or #5 


      let rooms = []; //array that holds the rooms in order of position
      //itterates through each room number but the last one
      for (let i = 0; i < this.roomCount - 1; i++) { // i = room number
        let availableRooms = []; // array that holds all available rooms for the current room number
        //if the first 10 rooms, the room position property must include the room number
        if (i <= 10) {
          for (let room of this.roomObjects) {
            if (room.positions.includes(i) && !room.selected) {
              room.position = i;
              availableRooms.push(room);
            }
          }
        //if the room number is greater than 10, than the room position property can include the room number or 11
        } else if (i > 10) {
          for (let room of this.roomObjects) {
            if ((room.positions.includes(11) && !room.selected) || (room.positions.includes(i) && !room.selected)) {
              room.position = i;
              availableRooms.push(room);
            }
          }
        }
        //if there are available rooms, then a random room is selected and added to the rooms array
        if (availableRooms.length > 0) {
          let room = availableRooms[Math.floor(Math.random() * availableRooms.length)];
          room.selected = true;
          rooms.push(room);
          //if there are no available rooms, then the room number is logged to the console for debugging
        } else {
          console.log("error: no available rooms", i);
        }
      }
      //sets the final room's position to the final room
      this.roomObjects[15].position = this.roomCount - 1; 
      //adds the final room to the rooms array
      rooms.push(this.roomObjects[15]);
      //sets the global rooms variable to the rooms array
      this.rooms = rooms;
    },
    setRoom(room) {
        this.title = room.name;
        for (let enemy of room.enemies) {
            let enemyClone = JSON.parse(JSON.stringify(enemy));
            this.currentEnemies.push(enemyClone);
        }
        this.updateMap(room.position);
        this.log.unshift(`You entered ${room.name}`);
    },
    updateMap(position) {
      //changes position from number to letter for display if needed
      if (position == 0) {
        position = "s";
      } else if (position == this.roomCount - 1) {
        position = "e";
      }
      //updates the mapDisplay variable
      this.mapDisplay = ``;
      for (let i = 0; i < this.map.length; i++) {
        this.mapDisplay += "\n";
        for (let j = 0; j < this.map[i].length; j++) {
          if (this.map[i][j] == position) {
            this.mapDisplay += "O";
          } else if (this.map[i][j] != "x") {
            this.mapDisplay += "*";
          } else {
            this.mapDisplay += "x";
          }
        }
      }
    },
    calculateCharacterStats() {
      let attack = 0;
      let defense = 0;
      for (let equipment of Object.values(this.character.equipment)) {
        if (equipment.attack) {
          attack += equipment.attack;
        }
        if (equipment.defense) {
          defense += equipment.defense;
        }
      }
      this.character.stats.Attack = attack;
      this.character.stats.Defense = defense;
    },
    attackEnemy(enemy) {
      //weapon damage
      enemy.stats.Health -= this.character.stats.Attack;
      //poison damage
      let poison = this.character.stats.Poison;
      if (poison.active) {
        enemy.stats.Health -= poison.damage;
        poison.length--;
        if (poison.length <= 0) {
          poison.active = false;
          poison.damage = 0;
          poison.length = 0;
        }
      }
      if (enemy.alive == false) {
        return;
      } else if (enemy.stats.Health <= 0 && enemy.alive != false) {
        this.log.unshift(`${enemy.name} died!`);
        enemy.alive = false;
      } else {
        this.log.unshift(
          `${this.character.name} attacked ${enemy.name} for ${this.character.stats.Attack} damage!`
        );
        this.attackCharacter(enemy);
      }
    },
    attackCharacter(enemy) {
      this.character.stats.Health -= enemy.stats.Attack;
      this.log.unshift(
        `${enemy.name} attacked ${this.character.name} for ${enemy.stats.Attack} damage!`
      );
      if (this.character.stats.Health <= 0) {
        this.log.unshift(`${this.character.name} died!`);
        this.started = false;
        //TODO: add game over screen
      }
    },
    isRoomCompleted() {
      if (this.currentEnemies.length == 0) {
        console.log("room completed");
        this.rooms.splice(0, 1);
        this.setRoom(this.rooms[0]);
      }
    },
    removeEnemy(enemy) {
      this.currentEnemies.splice(this.currentEnemies.indexOf(enemy), 1);
      this.isRoomCompleted();
    },
    lootItem(enemy, item) {
      this.character.inventory.push(item);
      enemy.inventory = [];
      this.log.unshift(`${this.character.name} looted ${item.name}!`);
      this.removeEnemy(enemy);
    },
    useItem(item) {
      if (item.type === "weapon") {
        this.character.equipment.weapon = item;
        this.calculateCharacterStats();
        this.log.unshift(
          `${this.character.name} equipped ${item.name}!`
        );
      }
      if (item.type === "helm") {
        this.character.equipment.helm = item;
        this.calculateCharacterStats();
        this.log.unshift(
          `${this.character.name} equipped ${item.name}!`
        );
      }
      if (item.type === "chestplate") {
        this.character.equipment.chestplate = item;
        this.calculateCharacterStats();
        this.log.unshift(
          `${this.character.name} equipped ${item.name}!`
        );
      }
      if (item.type === "pants") {
        this.character.equipment.pants = item;
        this.calculateCharacterStats();
        this.log.unshift(
          `${this.character.name} equipped ${item.name}!`
        );
      }
      if (item.type === "potion") {
        if (item.heal) {
          this.character.stats.Health += item.heal;
          this.log.unshift(
            `${this.character.name} healed for ${item.heal} health!`
          );
        }
        if (item.poison) {
          this.character.stats.Poison.active = true;
          this.character.stats.Poison.damage = item.poison[0];
          this.character.stats.Poison.length = item.poison[1];
        }
      }
      this.character.inventory.splice(this.character.inventory.indexOf(item), 1);
    }
  },
});
app.mount("#app");
