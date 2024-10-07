const config = require('./config')
const express = require('express');
const router = express.Router();
const cors = require('cors');

const app = express();
app.use(cors());

app.listen(config.app.port, ()=>{
    console.log('server is up')
})