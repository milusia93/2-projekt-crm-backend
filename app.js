const config = require('./config')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const clientRoutes = require('./src/routes/ClientsRoutes')()
const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
const app = express();

mongoose
    .connect(mongoUrl, {})
    .then(()=>{
        console.log('mongo db is connected');
    })
    .catch((err)=>{
        throw err
    })

app.use(express.json())
app.use(cors());

app.use('/clients', clientRoutes);

app.listen(config.app.port, ()=>{
    console.log('server is up')
})