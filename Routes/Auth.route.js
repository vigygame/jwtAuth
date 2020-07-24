const express = require('express');
const router = express.Router();
const {signAccessToken,signRefreshToken, verifyRefreshToken} = require('../Utils/jwtUtils');
const createHttpError = require('http-errors');

router.post('/login',async(req,res,next)=>{
   try {
       console.log(req.body)
        const {email,password} = req.body
       if(email=="vigy.game@gmail.com" && password=="1234")
       {
            const acessToken = await signAccessToken("sddsds");
            const refreshToken = await signRefreshToken("sddsds");
            res.send({acessToken,refreshToken});
       }
       else
       {
        throw createHttpError.Unauthorized('Username/password not valid');
       }
       
   } catch (error) {
       console.log(error)
    return next(createHttpError.BadRequest('Invalid Username/Password'));
       next(error)
   }
    
})

router.post('/refresh-token',async(req,res,next)=>{
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createHttpError.BadRequest()
        const clientID = await verifyRefreshToken(refreshToken)
  
        const accessToken = await signAccessToken(clientID)
        const refToken = await signRefreshToken(clientID)
        res.send({ accessToken: accessToken, refreshToken: refToken })
      } catch (error) {
        next(error)
      }
      
})

router.delete('/logout',async(req,res,next)=>{
    res.send(' logout route')
})

module.exports = router;
