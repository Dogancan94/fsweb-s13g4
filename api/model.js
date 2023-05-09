const uuid = require('uuid');

function createId() {
  return uuid.v1();
}

function initialUsers() {
  return [
    { id: 1, username: 'admin', password: 'root' },
    { id: 2, username: 'customer', password: 'test' }
  ]
}

let users = initialUsers();

function get() {
  return users;
}

function getById(id) {
  return users.filter(user => user.id === id)[0];
}

function getByUsername(username) {
  return users.filter(user => user.username === username)[0];
}

function insert(user) {
  user.id = createId();
  users.push(user);
  return user;
}

function login(username, password) {
  return users.filter(user => user.username === username && user.password === password)[0];
}

module.exports = { get, getById, getByUsername, insert, login }