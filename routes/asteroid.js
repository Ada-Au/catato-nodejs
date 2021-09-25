module.exports = function (app) {
  app.post('/asteroid', function (req, res) {
    const input = req.body.test_cases;
    const asteroids_size = input.length;

    // TODO: only fire when 1) there is duplicates; else return 1
    // TODO：find the optimise position for firing the bomb which 2) its left and right side contains same side
    // TODO: destroy same asteroid types as much as possible
    // TODO: When duplicates cannot be found, return 1
    function isPalindrome(asteroid) {
      let temp = asteroid.length - 1;
      for (let i = 0; i < Math.ceil(asteroid.length / 2); i++) {
        if (asteroid[i] != asteroid[temp]) return false;
        temp--;
      }
      return true;
    }

    function palindrome(Map) {
      let res = 0;
      let arr;
      let count = 0;
      for (let i = 0; i < Map.length; i++) {
        var str = [];
        for (let j = i; j < Map.length; j++) {
          str.push(Map[j][1]);
          if (isPalindrome(str.toString())) {
            res = j - i + 1;
            if (res > count) {
              count = res;
              arr = Map.slice(i, i + count);
            }
          }
        }
        str.shift();
      }
      return arr;
    }

    const removeDuplicates = (s) => {
      let n = s.length;

      var indices = [];
      for (let i = 0; i < n - 1; i++) {
        if (s[i] != s[i + 1]) {
          indices.push([i, s[i]]);
        }
      }
      indices.push([n - 1, s[n - 1]]);

      return indices;
    };

    const calculate_origin = (arr) => {
      if (arr.length <= 1) return 0;
      var origin;
      var mid = Math.floor(arr.length / 2);
      origin = arr[mid - 1][0] + Math.ceil((arr[mid][0] - arr[mid - 1][0]) / 2);
      return origin;
    };

    const startPoint = (asteroid, arr) => {
      let start;
      for (start = arr[0][0]; start > 0; start--) {
        if (asteroid[start - 1] != arr[0][1]) break;
      }
      return start - 1;
    };

    const calculate_score = (asteroid, arr, L, R, score) => {
      var num = 0;
      if (arr.length <= 1) return score;
      var mid = Math.floor(arr.length / 2);
      if (R >= mid) {
        num += arr[R][0] - arr[R - 1][0];
      }
      if (L < mid) {
        if (L == 0) num += L - startPoint(asteroid, arr) + 1;
        else num += arr[L][0] - arr[L - 1][0];
      }
      // console.log(arr[R][1], num);
      if (num >= 10) score += num * 2;
      else if (num >= 7) score += num * 1.5;
      else score += num;
      if (R == L) return score;
      return calculate_score(asteroid, arr, L + 1, R - 1, score);
    };

    result = [];
    for (let i = 0; i < asteroids_size; i++) {
      var asteroid = input[i];
      var simple = removeDuplicates(asteroid);
      var arr = palindrome(simple);
      // console.log(arr);
      var origin = calculate_origin(arr);
      var score = calculate_score(asteroid, arr, 0, arr.length - 1, 1);
      result.push({ input: asteroid, score: score, origin: origin });
    }
    res.json(result);
  });
};
