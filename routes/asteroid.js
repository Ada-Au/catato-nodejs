module.exports = function (app) {
  app.post("/asteroid", function (req, res) {
    // res.send("Hello asteroid!");
    // const input = require("./asteroid_data");

    const input = req.body.input;
    res.send(input);
    const asteroids_size = input.length;

    var score;
    var origin;

    // TODO: find the max number of same letter and return it as scalar of multiplier
    // --> sorting the string to return the multiplier?
    // TODO: return the start of middle as ORIGIN

    // TODO: score multiplier of the number of asteroids is calculated per asteroid size as SCORE

    function binary_search_origin(asteroid, L, R) {
      if (R >= 1) {
        let mid = 1 + Math.floor((asteroid.length - 1) / 2);
        // console.log(mid);
        if (asteroid[mid] == asteroid[L]) {
          return L + 1;
        } else {
          return binary_search_origin(asteroid, ++L, R);
        }
      }
      return -1;
    }

    function calculate_score(asteroid, is_destroyed) {
      var score = 0;
      for (let i = 0; i < asteroid.length; i++) {
        var num = 1;
        if (is_destroyed[i]) continue;

        for (let j = i + 1; j < asteroid.length; j++) {
          if (asteroid[i] == asteroid[j]) {
            num++;
            is_destroyed[j] = true;
            // console.log(asteroid[i],asteroid[j], num, score);
          }
        }

        if (num >= 10) score += num * 2;
        else if (num >= 7) score += num * 1.5;
        else score += num;
        is_destroyed[i] = true;
      }
      return score;
    }

    result = [];
    for (let i = 0; i < asteroids_size; i++) {
      let asteroid = input[i];
      let is_destroyed = [];
      for (let i = 0; i < asteroid.length; i++) {
        is_destroyed.push(false);
      }
      score = calculate_score(asteroid, is_destroyed);
      origin = binary_search_origin(asteroid, 0, asteroid.length - 1);
      result.push({ input: asteroid, score: score, origin: origin });
      //   console.log("input:", asteroid);
      //   console.log("score:", score);
      //   console.log("origin:", origin);
    }
    console.log(JSON.stringify(result));
    res.json(JSON.stringify(result));
  });
};
