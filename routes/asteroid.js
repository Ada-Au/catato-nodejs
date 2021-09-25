module.exports = function (app) {
  app.post('/asteroid2', function (req, res) {
    const input = req.body.test_cases;
    const asteroids_size = input.length;

    function isPalindrome(asteroid) {
      let temp = asteroid.length - 1;
      for (let i = 0; i < Math.ceil(asteroid.length / 2); i++) {
        if (asteroid[i] != asteroid[temp]) return false;
        temp--;
      }
      return true;
    }

    function removeDuplicates(asteroid) {
      var indices = [];
      let count = 0;
      strLen = asteroid.length;

      for (let i = 0; i < strLen; i++) {
        count++;
        if (asteroid[i] != asteroid[i + 1]) {
          indices.push([count, asteroid[i]]);
          count = 0;
        }
      }
      indices.push([count, asteroid[strLen - 1]]);

      return indices;
    }

    function palindrome(asteroid) {
      let maxLength = 0,
        pos = -1;

      for (let i = 0; i < asteroid.length; i++) {
        let str = asteroid.substr(i, asteroid.length);
        for (let j = str.length; j >= 0; j--) {
          let sub = str.substr(0, j);
          if (sub.length <= 1) continue;

          if (isPalindrome(sub)) {
            if (sub.length > maxLength) {
              maxLength = sub.length;
              pos = i;
            }
          }
        }
      }

      pos += Math.ceil(maxLength / 2);
      return [--pos, maxLength];
    }

    result = [];
    for (let i = 0; i < asteroids_size; i++) {
      var asteroid = input[i];

      simplifiedString = '';
      asteroidArray = removeDuplicates(asteroid);
      console.log(asteroidArray);
      asteroidArray.map((size) => (simplifiedString += size[1]));
      palin = palindrome(simplifiedString);
      console.log(palin);

      let score = 0,
        origin = 1;

      for (let i = 0; i < Math.ceil(palin[1] / 2); i++) {
        if (i == 0) {
          sizeLength = asteroidArray[palin[0] + i][0];
        } else {
          sizeLength = asteroidArray[palin[0] + i][0] + asteroidArray[palin[0] - i][0];
        }
        if (sizeLength >= 10) {
          score += sizeLength * 2;
        } else if (sizeLength >= 7) {
          score += sizeLength * 1.5;
        } else {
          score += sizeLength;
        }
        console.log(score);
      }

      for (let i = 0; i < palin[0]; i++) {
        origin += asteroidArray[i][0];
      }
      result.push({ input: asteroid, score: score, origin: origin });
    }
    res.json(result);
  });
};
