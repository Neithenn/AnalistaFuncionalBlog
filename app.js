const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const methodOverride = require("method-override");
const session = require("express-session");
const favicon = require('serve-favicon');
const app = express();


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(session({
  secret: "dadqwfqfwefwefewfefwq",
  resave: false,
  saveUninitialized: false
}));

function checkUser(req, res, next){
  if (!req.session.username || req.session.role != 'admin'){
    res.redirect('/login');
  }else{
    next();
  }
}

function crearFecha(){
  var d = new Date();
  var numero_dia = d.getDate();
  var numero_mes = d.getMonth();
  var numero_ano = d.getFullYear();
  var dia_semana = d.getDay();
  var fecha;
  //sacar Lunes, 24 de Mayo, 2017
  switch(dia_semana){
    case 0:
    fecha = 'Domingo';
      break;
          case 1:
          fecha = 'Lunes,';
      break;
          case 2:
          fecha = 'Martes,';
      break;
          case 3:
          fecha = 'Miércoles,';
      break;
          case 4:
          fecha = 'Jueves,';
      break;
          case 5:
          fecha = 'Viernes,';
      break;
          case 6:
          fecha = 'Sábado,';
      break;
  }

  fecha = fecha+ ' ' +numero_dia + ' de';

  switch(numero_mes){
    case 0:
    fecha = fecha + ' Enero de';
      break;
          case 1:
          fecha = fecha +  ' Febrero de';
      break;
          case 2:
          fecha = fecha +  ' Marzo de';
      break;
      case 3:
          fecha = fecha +  ' Abril de';
      break;
          case 4:
          fecha = fecha +  ' Mayo de';
      break;
          case 5:
          fecha = fecha +  ' Junio de';
      break;
          case 6:
          fecha = fecha +  ' Julio de';
      break;
          case 7:
          fecha = fecha +  ' Agosto de';
      break;
      case 8:
          fecha = fecha +  ' Septiembre de';
      break;
      case 9:
          fecha = fecha +  ' Octubre de';
      break;
      case 10:
          fecha = fecha +  ' Noviembre de';
      break;
      case 11:
          fecha = fecha +  ' Diciembre de';
      break;

  }

  fecha = fecha + ' ' + numero_ano;
  return fecha;

}

  var db
  var Post = require("./models/post"); 
  var User = require("./models/user"); 
  var Contact = require("./models/contact");


app.get('/', function(req, res) {
  Post.find(function(err, doc){
    res.render('index.ejs', {posts: doc, user: req.session.username})
  })
})

app.get('/post/:title/show', function(req,res){
  Post.findOne({title: req.params.title}, function(err, post){
    res.render('show.ejs', { post: post, user: req.session.username });
  })
})

app.get('/post/new', checkUser, function(req, res){
  res.render('new.ejs');
})

app.post('/post/new', function(req, res){

var fecha = crearFecha();	
var post = new Post({title: req.body.title,
                    intro: req.body.intro,
                    text: req.body.text,
                    date: fecha})

  post.save(function(err){
    if (err) throw err;
    res.redirect('/');
  })
})

app.delete('/post/:id/delete', checkUser, function(req, res){
  Post.findByIdAndRemove(req.params.id, function(err){
    if(err) throw err;
    res.redirect('/');

  })

})

app.get('/post/:id/edit', checkUser, function(req,res){
    Post.findById(req.params.id, function(err, post){
        if(err) throw err;
          else return res.render('edit.ejs', {post: post})
    })
})


app.put('/post/:id/edit', function(req, res){
  Post.findById(req.params.id, function(err, post){
    if (err) throw err;

    post.title = req.body.title;
    post.intro = req.body.intro;
    post.text = req.body.text;

    post.save(function(err){
      if (err) throw err;
      res.redirect('/');
      })

  })
})

app.get('/login', function(req,res){
  res.render('login.ejs');
})

app.post('/login', function(req,res){
  User.findOne({username: req.body.username, password: req.body.password}, function(err, user){
    req.session.username = user.username;
    req.session.role = user.role;
    res.redirect('/');
  })

})

app.get('/contact', function(req,res){
  res.render('contact.ejs');
})

app.post('/contact', function(req,res){

  var contact = new Contact({
    email: req.body.email,
    text: req.body.text
  })

  contact.save(function(err){
     if (err) throw err;
      res.redirect('/');
    }
    )
})

app.get('/autor', function(req,res){
  res.render('autor.ejs');
})

  app.listen(process.env.PORT || 8081, () => {

    })