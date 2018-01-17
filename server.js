const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine','hbs');

app.use((req,res,next)=>{

var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`
console.log(log);
fs.appendFile('server.log', log, (err)=>{
  if(err){
    console.log('Unable to append file');

  }
});
next();

});

// app.use((req,res,next)=>{
//
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});


//helper for queryParameter

hbs.registerHelper('queryParameter', (req,res)=> {
  return req.query;
});

app.get('/',(req,res)=>{

res.render('home.hbs',{
  pageTitle:'Home Page',
  welcomeMessage:'Welcome to Hamzy Homepage'
});
});

app.get('/about',(req,res)=>{

res.render('about.hbs',{
  pageTitle:'About Page'
});
});

// app.get('/I/want/title',(req,res)=>{
// var queryParameter = JSON.stringify(req.body);
//  console.log(queryParameter);
//   res.render('title.hbs');
// });




//bad  -- send back json with errorMessage

app.get('/bad',(req,res)=>{

res.send({
  error:true,
  message:'Could not fulfill the request'
});

});

app.listen(3000,()=>{
  console.log('Server is successfully running on Port 3000');
});
