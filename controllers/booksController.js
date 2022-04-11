
const book = require("../models/book");
const db = require("../models/index");
const book_schema = db.book;
const user_schema = db.user;

exports.create = (req,res)=>{
    const book ={
        lsbn_no : req.body.lsnb_no,
        name : req.body.name,
        author : req.body.author,
        publishedOn : req.body.publishedOn
    }
    let temp = req.body.lsnb_no;
    
    let promise= book_schema.findOne({where:{lsnb_no : temp}});
    
    if(promise){
        res.status(400).send({
            message : "cannot create duplicate book"
        })
    }
    else{
    book_schema.create(book).then(data=>{
        res.status(200).send(data);
        }).catch(err=>{
        res.staus(500).send({
            message : "some error happened"
            })
        })
    }
      
}

exports.findAll = (req,res)=>{
    book_schema.findAll().then(data=>{
        res.status(200).send(data);
    }).catch(err=>{
        res.staus(500).send({
            message : "cannot find all book"
            })
    })
}

exports.postMethod =(req,res)=>{
    const del = req.params.delete;
    const rent = req.params.rent;   //rented
    const ret = req.params.return;  //returned

    if(del){
        const bookId = req.body.bookId;
        book_schema.destroy(bookId).then(()=>{
            res.status(200).send({
                message : "book deleted"
            })
        }).catch(err=>{
            res.status(500).send(err);
        })
    }

   else if(rent){
            const bookId = req.body.bookId;
        book_schema.findOne({where : {id : bookId}}).then(book=>{

            book.setUsers(req.userId).then(()=>{        //this is used to set the users in many to many relationship      
                res.status(200).send({
                    message: "successfully rented"
                })
            }).catch(err=>{
                res.status(400).send({
                    message : "cannot rent this book"
                })
            })
        })
    }
    else if(ret){
        
        const bookId = req.body.bookId;

        promise= book_schema.findOne({where : {id : bookId}})

        if(promise){
        
         res.staus(200).send({
             message : "books returned"
         })   
        }

        else {
            res.status(500).send({
                message : "books not returned"
            })
        }
    }
}
 
exports.getRented = (req,res)=>{
    const userId = req.params.userId;

    book_schema.findAll({where : {id : userId}}).then(data=>{
        res.status(200).send({data})
    }).catch(err=>{
        res.status(400).send(err);
    })
}
