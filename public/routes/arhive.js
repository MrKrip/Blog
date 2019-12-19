const express=require('express')
const router=express.Router()

const models = require('../../models');
const config =require('../../config')


router.get("/single/:post",(req,res)=>{
      const url =req.params.post.trim().replace(/ +(&= )/g,'')
      const id=req.session.userID
      const login = req.session.userLogin
        if(!url)
        {
            alert('404 error')
        }else{
            models.Post.findOne({
                url
            }).then(post=>{
                if(!post){
                    
                }else{
                   res.render('single',{
                     post,
                     user:{
                         id:id,
                         login:login
                     }  
                   })
                }
            })
        }
})

router.get('/userposts/:login',(req,res)=>{
    const login =req.params.login
    const id=req.session.userID
    const userLogin = req.session.userLogin
        models.User.findOne({
            login
        }).then(user=>{
           models.Post.find({
               owner:user.id
           })
           .sort({ createdAt: -1 })
           .then(posts=>{
               models.Post.count({
                owner:user.id
               }).then(count=>{
                   res.render('usersposts',{
                   posts,
                   user:{
                       id:id,
                       userLogin:userLogin
                   }  
                 })   
               })
                          
          })  
        })         

})

module.exports = router;