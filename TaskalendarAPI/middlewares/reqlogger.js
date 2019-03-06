function reqlogger(req,res,next){
    console.log(req);
    next();
}

module.exports=reqlogger;