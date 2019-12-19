const express=require('express')
const router=express.Router()

const models = require('../../models');
const config =require('../../config')


router.get('/:page',(req,res)=>{
    const userId=req.session.userId
    const userLogin=req.session.userLogin

    const perPage=config.PER_PAGE
    const page = req.params.page || 1

    models.Post.find({}).skip(perPage*page - perPage)
    .limit(perPage)
    .then(posts=>{
        models.Post.count().then(count=>{
            res.render('index',{
                current : page,
                pages : Math.ceil(count / perPage),
                user: {
                    id: userId,
                    login: userLogin
                }
            })
        }).catch(console.log)
    }).catch(console.log)

})

module.exports = router;