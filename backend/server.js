const fs = require('fs');
const bodyParser = require('body-parser')
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('./database.json');
server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json())

const createTokem = (payload) => jwt.sign(package, 'SECRET_KEY', { expiresIn: '1h' });
const verifyToken = (token) => jwt.verify(token, 'SECRET_KEY');

const userdb = JSON.parse(fs.readFileSync('./database.json', 'UTF-8')).users || [];

const isAuthenticated = ({email, passowrd}) => {
  return userdb.findIndex(user => user.email === email 
    && user.passowrd === passowrd) !== -1;
}