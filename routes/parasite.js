// module.exports = function (app) {
//   app.post("/parasite", function (req, res) {
//     res.send("Hello parasite!");
//     res.send(req.body.input);
//   });
// };

'use strict';

const fs = require('fs');
let rawdata = fs.readFileSync('/Users/adaau/Task/catato-nodejs/routes/data.json');
let data = JSON.parse(rawdata);

console.log(data, '\n');

var result;

data.map((room) => {
  result = { room: room.room, p1: {} };
  room.interestedIndividuals.map((person) => {
    result.p1[person] = 0;
  });

  console.log(room.room);
  room.grid.map((row) => console.log(row));
  console.log(room.interestedIndividuals);

  let infected = 0;
  let infectPpl = [];
  let tick = 0;

  //   room.interestedIndividuals.map((person) => {
  //     var pos = person.split(',').map((n) => (n = parseInt(n)));
  //     if (room.grid[pos[0]][pos[1]] != 1) {
  //     }
  //   });

  do {
    room.interestedIndividuals.map((person) => {
      person.split(',');
    });

    tick++;
    infected = 0;
    infectPpl = [];
    for (let i = 0; i < room.grid.length; i++) {
      for (let j = 0; j < room.grid[0].length; j++) {
        if (room.grid[i][j] == 3) {
          infectPpl.push([i, j]);
        }
      }
    }
    console.log(infectPpl);
    infectPpl.map((person) => {
      if (person[0] - 1 >= 0 && room.grid[person[0] - 1][person[1]] == 1) {
        room.grid[person[0] - 1][person[1]] = 3;
        infected++;
      }
      if (person[1] - 1 >= 0 && room.grid[person[0]][person[1] - 1] == 1) {
        room.grid[person[0]][person[1] - 1] = 3;
        infected++;
      }
      if (person[0] + 1 < room.grid.length && room.grid[person[0] + 1][person[1]] == 1) {
        room.grid[person[0] + 1][person[1]] = 3;
        infected++;
      }
      if (person[1] + 1 < room.grid.length && room.grid[person[0]][person[1] + 1] == 1) {
        room.grid[person[0]][person[1] + 1] = 3;
        infected++;
      }
    });

    room.grid.map((row) => console.log(row));
  } while (infected > 0);

  console.log(JSON.stringify(result));
});
