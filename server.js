const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const projectsRouter = require('./projects/projects-router')

const server = express();

// id gatekeeper so that any action with an id of 3 cannot be posted
function idGatekeeper(req, res, next){
    const { id } = req.params;
    if(id === 3){
      res.status(403).json({message: 'ID cannot be found!'});
    } else{
      next();
    }
 }

server.use(idGatekeeper);
server.use(morgan('dev'))
server.use(express.json()); // built in middleware

//server.use('/api/helpers', projectsRouter)

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});


module.exports = server;