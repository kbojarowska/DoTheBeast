const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');
const cors = require('cors');

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Do The Beast',
        version: '1.0.0',
        description: 'API documentation for Do The Beast Application',
      },
    },
    apis: ["./controllers/*.js"],
  };

const swaggerSpec = swaggerJsDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
  next();
});

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', require('./routes/userRoutes'));
app.use('/monsters', require('./routes/monsterRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/todolists', require('./routes/todoListRoutes'));

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
