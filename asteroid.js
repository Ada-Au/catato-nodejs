const input = require('./asteroid_data');

const asteroids_size = input.length;

var score;
var origin;

// TODO: remove the adjacent duplicates

// TODO: find the max number of same letter and return it as scalar of multiplier
// --> sorting the string to return the multiplier?
// TODO: return the start of middle as ORIGIN

// TODO: score multiplier of the number of asteroids

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

function removeDuplicates(asteroid, mid, score) {
  let start = mid - 1;
  let i;
  if (asteroid.length == 1 || asteroid.length == 0) return score;
  for (i = mid; i < asteroid.length; i++) {
    if (asteroid[i - 1] != asteroid[i]) break;
  }
  var part = asteroid.substring(start, i);
  asteroid = asteroid.substring(0, start) + asteroid.substring(i);

  if (part.length >= 10) score += part.length * 2;
  else if (part.length >= 7) score += part.length * 1.5;
  else score += part.length;

  return removeDuplicates(asteroid, binary_search_origin(asteroid, 0, asteroid.length), score);
}

for (let i = 0; i < asteroids_size; i++) {
  let asteroid = input[i];

  origin = binary_search_origin(asteroid, 0, asteroid.length - 1);
  score = removeDuplicates(asteroid, origin, 0);
  console.log('input:', asteroid);
  console.log('score:', score);
  console.log('origin:', origin);
}
