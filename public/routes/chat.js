const express=require('express')
const router=express.Router()
const session = require('express-session');
const MongoStore=require('connect-mongo')(session);



const models = require('../../models');

router.post('/chat',(req,res)=>{
    const masg = req.body.message;
    const userid=req.session.userID;
    const login = req.session.userLogin;
    if(!userid && !login)
    {
        res.json({
            ok:false,
            error :'Log in before add new post'
        })
    }else if(!masg)
    {
        res.json({
            ok:false,
            error :'Fill in all the fields'
        })
    }else{

    }
   
})

module.exports=router;
