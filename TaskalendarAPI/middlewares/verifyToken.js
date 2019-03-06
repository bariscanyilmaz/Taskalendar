const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined 
    if (typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretkey', function(err, decoded) {
            if(!err){
                req.user=decoded.user;
               
                //next middleware
                next();
                 // bar
            }else{
                res.status(401).json({message:'Invalid Token',isSuccessfull:false});
            }
            
        });
    } else {
        //forbidden
        res.sendStatus(403);
    }
}

module.exports=verifyToken;
