// const express = require("express");

// const {
//   loginUser
// } = require("../controllers/loginController");

// const router = express.Router();

// router.post("/login", loginUser);

// module.exports = router;


 
 
 const login_controller = require("../controllers/loginController");
 
 module.exports =function(app){
    app.post("/create/user",login_controller.create);

 }


