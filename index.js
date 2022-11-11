const express =require("express");
const pug=require('pug');
const path=require('path');
const bodyParser=require('body-parser');
const app = express();

const mongoose = require('mongoose');

const port=80;
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we are connected")
});



const contactSchema = new mongoose.Schema({
    myname:  String,
    mygender: String,
    myemail: String,
    mycontact: String,
    myaddress: String
  });
  const cont = mongoose.model('cont', contactSchema);
 
 
  



app.set('view engine'  , 'pug');
app.set('views' , path.join(__dirname ,"views"));
app.use(express.static( path.join( __dirname , "statics" )))

app.get('/', (req ,res)=>{
    res.render("home")

});

app.get('/about', (req ,res)=>{
    res.render("about")

});
app.get('/contact', (req ,res)=>{

    res.render("contact")

});
app.post('/contact', (req ,res)=>{
      var data= new  cont(req.body)
      data.save().then(()=>{
        res.send ("send")
      })

    

});
app.get('/pricing', (req ,res)=>{
    res.render("pricing")

});
app.listen(port , ()=>{
    console.log("server starts now ")
});