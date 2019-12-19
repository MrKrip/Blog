const express=require('express')
const router=express.Router()
const session = require('express-session');
const MongoStore=require('connect-mongo')(session);



const models = require('../../models');

router.post('/newpost',(req,res)=>{
    const title =req.body.title.trim().replace(/ +(?= )/g, '');
    const body = req.body.body;
    const userid=req.session.userID;
    const login = req.session.userLogin;
    if(!userid && !login)
    {
        res.json({
            ok:false,
            error :'Log in bedore add new post'
        })
    }else if(!title || !body)
    {
        res.json({
            ok:false,
            error :'Fill in all the fields'
        })
    }else{
        models.Post.create({
            title,
            body,
            owner : userid

        }).then(post=>{
            console.log(post)
            res.json({
                ok:true
            })
        }).catch(err=>{
            console.log(err)
            res.json({
                ok:false
            })
        })

    }
   
})

module.exports=router;
