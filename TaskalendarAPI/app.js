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
const CONFIG=require('./config.json');

//MONGOOSE
mongoose.connect(CONFIG.CONN_URI,{ useNewUrlParser: true })
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