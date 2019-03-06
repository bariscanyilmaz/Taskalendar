const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Task = require('../models/Task');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//http:localhost:3000/tasks?lte=12321000&gte01231231000

router.post('/login', (req, res) => {
    const user = req.body;
    if (!user) {
        res.status(501).json({message:'User not found',isSuccessful:false});
    } else {
        User.findOne({ 'email': user.email }).then(findedUser => {
            if (!findedUser) {
                res.status(401).json({ message: 'User not found' ,isSuccessful:false});
            } else {
                //Match password
                bcrypt.compare(user.password, findedUser.password, (err, isMatch) => {
                    if (err) console.log(err);

                    if (isMatch) {

                        jwt.sign({ user: user.email }, 'secretkey', { expiresIn: 300 }, (err, token) => {
                            res.status(200).json({
                                token,isSuccessful:true
                            });
                        });

                    } else {
                        res.status(401).json({ message: 'Password incorrect',isSuccessful:false });
                    }

                });

            }


        });

    }

});

router.post('/register', (req, res) => {
    const user = req.body;
  
    if (!user) {
        res.json({ message: 'user not found' });
    } else {
        User.findOne({ 'email': user.email }).then(findedUser => {
            if (findedUser) {
                res.status(204).json({ message: 'User email already exist',isSuccessful:false });
            } else {
                const newUser = new User(user);

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //set has to password
                        newUser.password = hash;
                        //Save User

                        newUser.save((userErr, createdUser) => {
                            if (userErr) {
                                res.status(500).json({ message: `${userErr}`,isSuccessful:false });
                            } else {
                                res.status(200).json({ message: 'Succesfull',isSuccessful:true,user:createdUser});
                            }
                        });

                    });

                });
            }
        });
    }

});



module.exports = router;