// module.exports = app => {
    const books = require("../controllers/book.controller");
  
    var bookRoute = require("express").Router();
  
    
    bookRoute.post("/createbook", books.createBook);

    bookRoute.get("/getallbooks", books.getAllBooks);

    bookRoute.delete("/removebook/:isbn", books.removeBook);
    
    bookRoute.put("/:isbn", books.update);

    

  module.exports = bookRoute;