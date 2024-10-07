const config = require('./config')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`

mongoose
    .connect(mongoUrl, {})
    .then(()=>{
        console.log('mongo db is connected');
    })
    .catch((err)=>{
        throw err
    })
const app = express();
app.use(express.json())
app.use(cors());

const clientRoutes = require('./src/routes/ClientsRoutes')()
app.use('/clients', clientRoutes);

app.listen(config.app.port, ()=>{
    console.log('server is up')
})