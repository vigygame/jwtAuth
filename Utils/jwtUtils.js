const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const { token } = require('morgan');

module.exports={
    signAccessToken:(clientid)=>{
        return new Promise((resolve,reject)=>{
            const payload={
                name:"40kplus"
                
            }
            const secret=process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn:'2m',
                issuer:'40kplus',
                audience:clientid
            }
            JWT.sign(payload,secret,options,(err,token)=>{
                if(err){
                    console.log(err);
                    // reject(err)
                    reject(createError.InternalServerError());
                } 
                resolve(token);
            })
        })
    },
    verifyAccessToken:(req,res,next)=>{
        if(!req.headers['authorization'])
        {
            return next(createError.Unauthorized());
        }
        const token = req.headers['authorization'].split(' ')[1];
        JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
            if(err){
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message

                return next(createError.Unauthorized(message))
            }
            req.payload =payload
            next();
        })
    },
    signRefreshToken:(clientid)=>{
        return new Promise((resolve,reject)=>{
            const payload={
            }
            const secret=process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn:'1d',
                issuer:'40kplus',
                audience:clientid
            }
            JWT.sign(payload,secret,options,(err,token)=>{
                if(err){
                    console.log(err);
                    // reject(err)
                    reject(createError.InternalServerError());
                } 
                resolve(token);
            })
        })
    },
    verifyRefreshToken:(refreshtoken)=>{
        return new Promise((resolve,reject)=>{
            JWT.verify(refreshtoken,process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
                if(err) return reject(createError.Unauthorized())
                const clientID=payload.aud

                resolve(clientID)
            })
        })
    }

}