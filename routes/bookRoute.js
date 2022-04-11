/**
 * this has REST apis
 */

 
 
 const book_controller = require("../controllers/booksController");
const { verifyToken, isAdmin } = require("../middleware/isadmin");

 
 module.exports =function(app){
    app.post("/book/create",[verifyToken,isAdmin],book_controller.create);
    app.get("/books/list",book_controller.findAll);
    app.post("/books",[verifyToken,isAdmin],book_controller.postMethod);
    app.get("/rented/:userId",[verifyToken,isAdmin],book_controller.getRented);
 }