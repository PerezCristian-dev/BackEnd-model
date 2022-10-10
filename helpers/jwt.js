const jwt = require('jsonwebtoken');

//Generating JWT will take user id and user name as arguments. 
const generateJWT =  ( uid, name )=>{
    //creating promise to handle JWT since libray is not async
    return new Promise((resolve, reject)=>{
        
        const payload ={uid, name};
        
        jwt.sign( payload/*Payload*/, process.env.SECRET_JWT_SEED /*secret Key*/, {
            expiresIn: '2h'/*duration*/
        }, (err, token )=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);
        })
    })
}

module.exports={
    generateJWT,
}