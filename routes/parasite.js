module.exports = function (app) {
  app.post('/parasite', function (req, res) {
    // console.log(req);
    let data = req.body;

    console.log(data, '\n');
    var result = [];

    data.map((room) => {
      let roomResult;
      var roomGrid = JSON.parse(JSON.stringify(room.grid));
      roomResult = { room: room.room, p1: {} };
      room.interestedIndividuals.map((person) => {
        var pos = person.split(',').map((n) => (n = parseInt(n)));
        if (roomGrid[pos[0]][pos[1]] == 1) {
          roomResult.p1[person] = 0;
        } else {
          roomResult.p1[person] = -1;
        }
      });

      console.log(room.room);
      roomGrid.map((row) => console.log(row));
      console.log(room.interestedIndividuals);

      let infected = 0;
      let infectPpl = [];
      let tick = 0;

      do {
        room.interestedIndividuals.map((person) => {
          person.split(',');
        });

        infected = 0;
        infectPpl = [];
        for (let i = 0; i < roomGrid.length; i++) {
          for (let j = 0; j < roomGrid[0].length; j++) {
            if (roomGrid[i][j] == 3) {
              infectPpl.push([i, j]);
            }
          }
        }
        console.log(infectPpl);
        infectPpl.map((person) => {
          if (person[0] - 1 >= 0 && roomGrid[person[0] - 1][person[1]] == 1) {
            roomGrid[person[0] - 1][person[1]] = 3;
            infected++;
          }
          if (person[1] - 1 >= 0 && roomGrid[person[0]][person[1] - 1] == 1) {
            roomGrid[person[0]][person[1] - 1] = 3;
            infected++;
          }
          if (person[0] + 1 < roomGrid.length && roomGrid[person[0] + 1][person[1]] == 1) {
            roomGrid[person[0] + 1][person[1]] = 3;
            infected++;
          }
          if (person[1] + 1 < roomGrid.length && roomGrid[person[0]][person[1] + 1] == 1) {
            roomGrid[person[0]][person[1] + 1] = 3;
            infected++;
          }
        });
        roomGrid.map((row) => console.log(row));
        tick++;

        room.interestedIndividuals.map((person) => {
          var pos = person.split(',').map((n) => (n = parseInt(n)));
          if (roomGrid[pos[0]][pos[1]] == 3 && roomResult.p1[person] == 0) {
            roomResult.p1[person] = tick;
          }
        });
      } while (infected > 0);

      roomResult.p2 = --tick;
      room.interestedIndividuals.map((person) => {
        var pos = person.split(',').map((n) => (n = parseInt(n)));
        if (roomResult.p1[person] == 0) {
          roomResult.p1[person] = -1;
          roomResult.p2 = -1;
        }
      });

      grid = JSON.parse(JSON.stringify(room.grid));
      tick = 0;
      console.log();

      do {
        infected = 0;
        infectPpl = [];
        for (let i = 0; i < grid.length; i++) {
          for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == 3) {
              infectPpl.push([i, j]);
            }
          }
        }

        infectPpl.map((person) => {
          if (person[0] - 1 >= 0 && grid[person[0] - 1][person[1]] == 1) {
            grid[person[0] - 1][person[1]] = 3;
            infected++;
          }
          if (person[1] - 1 >= 0 && grid[person[0]][person[1] - 1] == 1) {
            grid[person[0]][person[1] - 1] = 3;
            infected++;
          }
          if (person[0] + 1 < grid.length && grid[person[0] + 1][person[1]] == 1) {
            grid[person[0] + 1][person[1]] = 3;
            infected++;
          }
          if (person[1] + 1 < grid.length && grid[person[0]][person[1] + 1] == 1) {
            grid[person[0]][person[1] + 1] = 3;
            infected++;
          }

          if (person[0] - 1 >= 0 && person[1] - 1 >= 0 && grid[person[0] - 1][person[1] - 1] == 1) {
            grid[person[0] - 1][person[1] - 1] = 3;
            infected++;
          }
          if (person[0] - 1 >= 0 && person[1] + 1 < grid.length && grid[person[0] - 1][person[1] + 1] == 1) {
            grid[person[0] - 1][person[1] + 1] = 3;
            infected++;
          }
          if (person[0] + 1 < grid.length && person[1] - 1 >= 0 && grid[person[0] + 1][person[1] - 1] == 1) {
            grid[person[0] + 1][person[1] - 1] = 3;
            infected++;
          }
          if (person[0] + 1 < grid.length && person[1] - 1 >= 0 && grid[person[0] + 1][person[1] + 1] == 1) {
            grid[person[0] + 1][person[1] + 1] = 3;
            infected++;
          }
        });
        grid.map((row) => console.log(row));
        tick++;
      } while (infected > 0);

      roomResult.p3 = --tick;
      grid.map((row) => {
        var index = row.indexOf(1);
        if (index > -1) {
          roomResult.p3 = -1;
        }
      });

      let energy = 0;
      if (p)
        do {
          infected = 0;
          infectPpl = [];
          for (let i = 0; i < roomGrid.length; i++) {
            for (let j = 0; j < roomGrid[0].length; j++) {
              if (roomGrid[i][j] == 3) {
                infectPpl.push([i, j]);
              }
            }
          }

          isEnergyUsed = false;
          infectPpl.map((person) => {
            if (person[0] - 1 >= 0) {
              if (roomGrid[person[0] - 1][person[1]] == 0 && roomGrid[person[0] - 1][person[1]] == 2) {
                isEnergyUsed = true;
                roomGrid[person[0] - 1][person[1]] = 3;
              }
              if (roomGrid[person[0] - 1][person[1]] == 1) {
                roomGrid[person[0] - 1][person[1]] = 3;
              }
            }
            if (person[1] - 1 >= 0) {
              if (roomGrid[person[0]][person[1] - 1] == 0 && roomGrid[person[0]][person[1] - 1] == 2) {
                isEnergyUsed = true;
                roomGrid[person[0]][person[1] - 1] = 3;
              }
              if (roomGrid[person[0]][person[1] - 1] == 1) {
                roomGrid[person[0]][person[1] - 1] = 3;
              }
            }
            if (person[0] + 1 < roomGrid.length && roomGrid[person[0] + 1][person[1]] != 0) {
              if (roomGrid[person[0] + 1][person[1]] == 0 && roomGrid[person[0] + 1][person[1]] == 2) {
                isEnergyUsed = true;
                roomGrid[person[0] + 1][person[1]] = 3;
              }
              if (roomGrid[person[0] + 1][person[1]] == 1) {
                roomGrid[person[0] + 1][person[1]] = 3;
              }
            }
            if (person[1] + 1 < roomGrid.length && roomGrid[person[0]][person[1] + 1] != 0) {
              roomGrid[person[0]][person[1] + 1] = 3;
              if (roomGrid[person[0]][person[1] + 1] == 0 && roomGrid[person[0]][person[1] + 1] == 2) {
                isEnergyUsed = true;
                roomGrid[person[0]][person[1] + 1] = 3;
              }
              if (roomGrid[person[0]][person[1] + 1] == 1) {
                roomGrid[person[0]][person[1] + 1] = 3;
              }
            }
          });

          do {
            infected = 0;
            infectPpl = [];
            for (let i = 0; i < roomGrid.length; i++) {
              for (let j = 0; j < roomGrid[0].length; j++) {
                if (roomGrid[i][j] == 3) {
                  infectPpl.push([i, j]);
                }
              }
            }

            infectPpl.map((person) => {
              if (person[0] - 1 >= 0 && roomGrid[person[0] - 1][person[1]] == 1) {
                roomGrid[person[0] - 1][person[1]] = 3;
                infected++;
              }
              if (person[1] - 1 >= 0 && roomGrid[person[0]][person[1] - 1] == 1) {
                roomGrid[person[0]][person[1] - 1] = 3;
                infected++;
              }
              if (person[0] + 1 < roomGrid.length && roomGrid[person[0] + 1][person[1]] == 1) {
                roomGrid[person[0] + 1][person[1]] = 3;
                infected++;
              }
              if (person[1] + 1 < roomGrid.length && roomGrid[person[0]][person[1] + 1] == 1) {
                roomGrid[person[0]][person[1] + 1] = 3;
                infected++;
              }
            });
          } while (infected > 0);

          roomGrid.map((row) => console.log(row));
        } while (infected > 0);

      roomResult.p4 = tick;
      result.push(roomResult);
    });
    res.json(result);
  });
};
