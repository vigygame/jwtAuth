const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config();
const {verifyAccessToken}  = require('./Utils/jwtUtils');
const AuthRoute = require('./Routes/Auth.route');
const app = express();
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const PORT = process.env.PORT||3000;

app.get('/',verifyAccessToken,async(req,res,next)=>{
        res.send("40k")
})
app.use('/auth',AuthRoute);

app.use(async(req,res,next)=>{
    // const error =new Error("Not found")
    // error.status=404;
    // next(erorr);
    next(createError.NotFound('This route does not exist'))
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
       "error":{
        "status":err.status || 500,
        "message" : err.message
        }
    })
})

app.listen(PORT,()=>{
    console.log(`40K node application running on port ${PORT}`);
})

