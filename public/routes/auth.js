const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt-nodejs')

const models = require('../../models');

router.post('/register', (req, res)=>{
    const login=req.body.login
    const passwd =req.body.password
    console.log(login)
    console.log(passwd)
    if (!login || !passwd) {
        res.json({
            ok:false,
            error: 'Fill in all the fields'
        })
    }else if(login.length < 3)
    {
        res.json({
            ok:false,
            error:'Login length from 3 characters'
        })
    }else{
        bcrypt.hash(passwd,null,null,(err,hash)=>{
            models.User.create({
                login,
                password:hash
            }).then(user =>{
                req.session.userID=user.id
                req.session.userLogin=user.login
                res.json({
                    ok:true
                })
            }).catch(err=>{
                console.log(err)
                res.json({
                    ok:false,
                    error:'Error'
                })
            })
        })
    }

})

router.post('/log', (req, res)=>{
    const login=req.body.login
    const passwd =req.body.password
    if (!login || !passwd) {
        res.json({
            ok:false,
            error: 'Fill in all the fields'
        })
    }else{
        models.User.findOne({
            login
        }).then(user=>{
            if(!user)
            {
                res.json({
                    ok: false,
                    error: 'Login or password uncorrect'
                })
            }else{
                bcrypt.compare(passwd,user.password,(err,result)=>{
                    if(!result)
                    {
                        res.json({
                            ok: false,
                            error: 'Login or password uncorrect'
                        })
                    }else{
                        req.session.userID=user.id
                        req.session.userLogin=user.login
                        res.json({
                            ok:true
                        })
                    }
                })
            }
        }).catch(err=>{
            res.json({
                ok:false,
                error:'Error'
            })
        })
    }
})
    
router.get('/logout', (req,res)=>{
    if(req.session)
    {
        req.session.destroy(()=>{
            res.redirect('/')
        })
    }else{
        res.redirect('/')
    }
})

module.exports = router;