const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
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

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', require('./routes/userRoutes'));
app.use('/monsters', require('./routes/monsterRoutes'));

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
