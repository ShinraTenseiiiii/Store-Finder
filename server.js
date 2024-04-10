const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db.js');


const app = express();
app.use(express.json());

dotenv.config({path: 'config/config.env'});
connectDb();



app.use(cors());
app.use(express.static(path.join(__dirname, 'public',)))



// routes
app.use('/api/v1/stores', require('./routes/stores'));

const PORT = process.env.PORT ;
app.listen(PORT, ()=> console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`) );
