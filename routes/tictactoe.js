module.exports = function (app) {
  app.post('/tic-tac-toe', function (req, res) {
    res.send(req.body);
  });
};
