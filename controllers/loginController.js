

const Sequelize = require("sequelize");
const db = require("../models/index");

const user_schema = db.user;
const Op= db.Sequelize.Op;
const role_schema = db.role;

//creating user
exports.create = (req,res)=>{
    const user ={
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    }

   user_schema.create(user).then(User=>{
        res.status(200).send(User);
    }).catch(err=>{
        res.staus(500).send({
            message : "some error happened"
        })
    })

    if(req.body.roles){     //to check whether the roles are given
        role_schema.findAll({where : {[Op.or]: req.body.roles}}).then(roles=>{
            User.setRoles(roles).then(()=>{
                console.log("registration done");
                    res.status(200).send({
                        message: "user registered successfully"
                    })
            })
        })
    }else {

        user.setRoles([1]).then(() => {
            console.log("registration successful");
            res.status(201).send({
                message: "successful"
            })
        })
    }
}

exports.signin = (req, res) => {

    user_schema.findOne({ where: { email: req.body.email } }).then(user => {
        //if that user is not present
        if (!user) {
            res.status(404).send({
                message: "user not found"
            })
            return;
        }
        //verify the password
        
        if (req.body.password!==user.password) {
            res.status(401).send({
                message: "invalid password"
            })
            return;
        }
        /**
         * access token generated here
         */
        var token = jwt.sign({ id: user.id }, secretKey.secret, {
            expiresIn: 300 //this in seconds  //can be kept in config file 
        });

        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++)
                authorities.push("Role =" + roles[i].name.toUpperCase());
            
            res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    }).catch(err => {
        res.status(400).send({
            message: "Internal error while signing in"
        })
    })
}

