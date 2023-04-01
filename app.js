//before running this is folder ke andar aa jaana varna images load nai hoga
// cd ./dance
async function main() {
    const express=require("express");//express export

const fs=require("fs");
const app2=express();//app2 ko express ke barbar kr diya
const path=require("path");//path join karne ke liye path export kra liya
const port=80;
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
await mongoose.connect('mongodb://127.0.0.1:27017/dancecontact');
const contactSchema = new mongoose.Schema({
        name: String,
        phone:String,
        email:String,
        address:String

      });
const contact = mongoose.model('contact', contactSchema);
    // expres related stuff
/*To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express*/
app2.use('/static',express.static('static'))//dosra static folder ka name hai jiski
//files static hai
app2.use(express.urlencoded());//form ka data express tk laane ke liye

//pug specific stuff
app2.set('view engine','pug');//set the template engine as pug
app2.set('views',path.join(__dirname,'views'));//ab views folder ko bhi res.end kr sakte 
//hai
app2.get("/",(req,res)=>{// / means localhost i.e homepage jaise hi page open honga
    const params={ }
    res.render('home.pug',params);//params pass kr do to add ho jaayega
    
})
app2.get("/contact",(req,res)=>{
    
    
    res.render('contact.pug');//params pass kr do to add ho jaayega
    
})
app2.post("/contact",(req,res)=>{
    var data=new contact(req.body);
    data.save().then(()=>{
      res.send("this data have been saved")

    }).catch(()=>{
      res.status(400).send("item was not saved in the database")

    })
    
    res.render('contact.pug');//params pass kr do to add ho jaayega
    
})

//starting the server
app2.listen(port,()=>{
 
    console.log("welocme to the serve of dance");


})

  }
  main();


