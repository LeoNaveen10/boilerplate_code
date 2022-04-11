/**
 * validating token is done here
 */
 const jwt = require("jsonwebtoken");
 const config = require("../configs/secret.config");
 
 const db=require("../models");
 const User = db.user;
 
 
 const verifyToken = (req,res,next)=>{
     var token = req.headers['x-access-token'];
     
     if(!token){
      return  res.status(403).send({
             message : "Access token not provided"
         })
     }
   
     jwt.verify(token,config.secret,(err,decodedToken)=>{
         if(err){
             res.status(401).send({
                 message : "unauthorized"
             });
             return;
         }
        req.userid= decodedToken.id;  //Reading the user ID in token and setting it in req.userId
         next();
     })  
 }
 
 const isAdmin = (req,res,next)=>{
     // we got userID from verifyTOken function
     User.findByPk(req.userid).then(user=>{
         user.getRoles().then(roles=>{

             for(let i=0;i<roles.length;i++){
                 if(roles[i].name=="admin"){
                     next();
                     return;
                 }
             }
             res.status(401).send({
                 message : " Require Admin role "
             });
             return;
         })
     })
 }
 
 
 module.exports={
     verifyToken : verifyToken,
     isAdmin : isAdmin
 }
 