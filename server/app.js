const express = require("express");
const app=express()
const connectDB = require('./db')
const UserModel=require('./models/User')
const bcrypt = require('bcrypt')
const session = require('express-session');
const cors = require('cors');
connectDB()
app.use(function(req, res, next) {
    // withCredentials : true at client side for including all the cookies for every request so origin must be localhost:3000 instead of *
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(session(
    {
        secret:'secret-key',
        resave:false,
        saveUninitialized:false,
        cookie:
        {
            //default expiry making infinite expiration.
            maxAge:10000000000000,
            // accessible to client side javascript
            httpOnly:false
        }
    }
));
const hashPassword=async (password)=>
{
     const hashed_password = await bcrypt.hashSync(password,10);
     return hashed_password;
}
const verify = async (hashed_password,password)=>
{
    const result  = await bcrypt.compareSync(password,hashed_password);
    return result;
}
app.post('/signup',async (req,res,next)=>
{
      var {name,password,email} = req.body;
      if(name==='' || password=='' || email==''){res.status(401).send("Provide the details needed");}
      password=await hashPassword(password);
      await UserModel.create({name:name,password:password,email:email});
      req.session.user={email:email,name:name};
      res.status(200).send("User successfully saved to database and session created");     
});

app.post('/login',async (req,res,next)=>
{
    const {name,password,email}=req.body;
    if(name==='' || email===''){res.status(401).send("provide email and name fields");return;}
    const query=await UserModel.findOne({name:name,email:email});
    if(!query){res.status(401).send("No User found in the DataBase");return;}
    if(!query.password){res.status(401).send("Password not provided");return;}
    if(await verify(query.password,password))
    {
        //creating session object as the user is verified.
        req.session.user={email:email,name:name};
        console.log(req.session.cookie);
        res.status(200).send("Session started");
    }
    else
    {
        res.status(401).send("Incorrect Password");
    }
});

app.get('/checkSession',(req,res,next)=>
{
    //checking session object exists or not.
    if(req.session && req.session.user)
    {
        res.status(200).json({session:true,user:req.session.user});
    }
    else
    {
        res.status(200).json({session:false});
    }
});

app.get('/logout',(req,res,next)=>
{
    //destroying session
    req.session.destroy();
    res.status(200).send("Session destroyed");
})

app.listen(5000,()=>
{
    console.log("Server listening at Port : 5000");
})