const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');
const verifyToken=require('./middlewares/verifyToken');

//Routes
const taskRoutes = require('./routes/taskRoutes');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const ATLAS_URI='mongodb://taskalendar:Y!m%40z13ar$C%40n@taskalendar-shard-00-00-ra9ii.azure.mongodb.net:27017,taskalendar-shard-00-01-ra9ii.azure.mongodb.net:27017,taskalendar-shard-00-02-ra9ii.azure.mongodb.net:27017/test?ssl=true&replicaSet=Taskalendar-shard-0&authSource=admin&retryWrites=true';
const LOCAL_URI='mongodb://localhost:27017/TaskalendarDB';

//MONGOOSE
mongoose.connect(LOCAL_URI,{ useNewUrlParser: true })
    .then(() => console.log('mongodb connected'))
    .catch((err) => console.log(err));
//Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS-enabled for all origins!
app.use(cors());



app.use('/',indexRoutes)
app.use('/task',verifyToken, taskRoutes);
app.use('/user', userRoutes);


//PORT
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }else{
        console.log(`Serve started at ${port}`);
    }
    
})