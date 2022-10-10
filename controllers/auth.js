//Response is imported from express to keep its reference. 
const {response} = require('express');

//Importing Bcryptjs - library to handle encrypting
const bcrypt = require('bcryptjs');

//Importing Users
const User = require('../models/users-model');

//Importing JWT
const {generateJWT} = require('../helpers/jwt');

//here we configure the callback methods we need to use for each type of request we want our API to have. 
// JSON File to be return on each request.


//Post request
const createUser = async (req, res = response)=>{
// console.log(req.body);

//Req is an object that includes what the user is sending to our API it contains lots of information yet we are looking to get the body property of the object.
//Res JSON() can only be excuted one time. with return we finish the function if the statement is truthsy.

//MiddleWare a function to be excecuted before something else. 

//To validation the information pass by the user we are using express-validator
//express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.
//To install express validator npm i express-validator 

 const {email, password} = req.body;


try{

    let user = await User.findOne({email})
    console.log(user);

    if(user){
        return res.status(400).json({
            ok: false,
            msg:"Email is already in use",
        });
    }
    
    

    user = new User( req.body );
    //Encrypting Password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //Generate JWT (JSON WEB TOKEN)
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
        ok:true,
        uid: user.id,
        name: user.name,
        token,
    });

} catch(error){
    console.log(error)
    res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador',
    });
}

}

//Post request
const userLogin = async (req, res = response)=>{

    const {email, password} = req.body;
    //Regular MiddleWare - Error Handler
    // ValidationResult shoulld be imported from 'express-validator' 
    // const errors = validationResult( req );
    //     if (!errors.isEmpty()){
    //         return res.status(400).json({
    //             ok: false,
    //             errors: errors.mapped()
    //         })

    //     }

    try{
        let user = await User.findOne({email})
        console.log(user);
    
        if(!user){
            return res.status(400).json({
                ok: false,
                msg:"User or password is incorrect, please try agin",
            });
        }

        //Confirm password igual DB password
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json(
                {
                    ok: false,
                    msg: 'Password is incorrect'
                }
            );
        }

        //Generating JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true, 
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }

   

}

//Get request
const tokenValidation = async (req, res = response)=>{

    const {uid, name} = req;

    //Generate JWT
    const token = await generateJWT(uid, name);

    
    res.json({
        ok:true,
        token,
    });
}

module.exports = {
    createUser,
    userLogin,
    tokenValidation,
}