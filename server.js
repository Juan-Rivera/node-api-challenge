const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');

// rotuer imports
const projectRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router')

// server
const server = express();

server.use(morgan('dev')) //logging middleware
server.use(express.json()); // built in middleware

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

//custom middleware


server.get('/', (req, res) => {
  res.send('Server is running');
});


module.exports = server;