const express=require('express');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');
const database=require('./models/database');
const Post=require('./models/post');
const routes=require('./public/routes');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore=require('connect-mongo')(session);



const app=express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave:true,
    saveUninitialized:false,
    store:new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
)




app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/auth', routes.auth)
app.use('/api', routes.post)
app.use('/api', routes.chat)
app.use('/', routes.arh)

app.get('/',(req,res)=>{
  Post.find({})
  .sort({ createdAt: -1 })
  .then(posts=>{
  const id=req.session.userID
  const login = req.session.userLogin
    res.render('index',{
      posts:posts,
      user:{
        id,
        login
      }
    })
  })
});

app.get('/chat',(req,res)=>{
  const id=req.session.userID
  const login = req.session.userLogin
  res.render('chat',{
    user:{
      id,
      login
    }
  })
})


app.get('/newpost',(req,res)=>{
  const id=req.session.userID
  const login = req.session.userLogin
    res.render('newpost',{
      user:{
        id,
        login
      }
    })
});


app.get('/login',(req,res)=>{
    res.render('login')
});

app.get('/registration',(req,res)=>{
    res.render('registration')
});

connections = [];

io.sockets.on('connection', function(socket) {
	console.log("Успешное соединение");
	connections.push(socket);
	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Отключились");
	});



});


database()
  .then(info => {
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    server.listen(config.PORT, () =>{
      console.log(`Example app listening on port ${config.PORT}! `)}
    );
  })
  .catch(() => {
    console.error('Unable to connect to database');
    process.exit(1);
  });