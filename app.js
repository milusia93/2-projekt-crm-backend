const config = require('./config')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const clientRoutes = require('./src/routes/ClientsRoutes')()
const actionRoutes = require('./src/routes/ActionsRoutes')()
const userRoutes = require('./src/routes/UsersRoutes')()
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

const AuthMiddleware = require("./src/middlewares/AuthMiddleware");    
app.use(express.json())
app.use(cors());
app.use(cookieParser())

app.use('/clients',AuthMiddleware, clientRoutes);
app.use('/actions',AuthMiddleware, actionRoutes);
app.use('/users', userRoutes);


app.listen(config.app.port, ()=>{
    console.log('server is up')
})