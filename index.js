const express = require('express');

const server = express();
server.use(express.json());


const users = ['kelly', 'dani', 'maycon', 'allan'];

function checkUsersInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: `Index doesn't exists`});
  }
  req.user = user;
  return next();
}

server.get('/users/', (req, res) => {
  //return res.send('A rota esta up');
  return res.json(users);
});
server.get('/users/:index', checkUsersInArray, (req, res) => {
  return res.json(req.user);
});

server.post('/users/', (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});


server.listen(3001);