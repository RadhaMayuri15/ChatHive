const exp=require("express")
const mongoose = require("mongoose"); 
const User = require('./models/User')
const jwt=require('jsonwebtoken')
const app=exp()
const cors=require('cors')
const cookieParser = require("cookie-parser");
const bcrypt = require('bcryptjs')

//we can put port number, database address in env file
//at end of project  put this jwt secret key in .env

const jwtSecret="appleballcatdog"
const bcryptSalt = bcrypt.genSaltSync(10);

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173' // can be included in .env as client_url
}))

app.use(cookieParser())
app.use(exp.json())

app.get('/profile', (req,res)=>{
    const token = req.cookies?.token;
    if(token){
        jwt.verify(token, jwtSecret, {}, (err, userData)=>{
            if (err) throw err;
            // const {id, username}= userData;
            res.json({userData});
        })
    } else {
        res.status(401).json('no token')
    }
    
})

app.post('/login', async (req,res)=>{
    const {username, password} = req.body;
    const foundUser=await User.findOne({username});
    if(foundUser) {
        const passOk = bcrypt.compareSync(password, foundUser.password);
        if(passOk){
            jwt.sign({userId:foundUser._id,username}, jwtSecret, {}, (err, token)=>{
                if (err) throw err;
                res.cookie('token', token, {sameSite:'none', secure:true}).json({
                    id: foundUser._id,
                })
            });
        } else{
            return res.status(400).json({ error: "Invalid password" });
        }
    }else{
        return res.status(400).json({ error: "USer not found" });
    }
})

app.post('/register',async (req,res)=>{
    const {username,password} =req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }
    try{
        const hashedPassword=bcrypt.hashSync(password, bcryptSalt)
        const createdUser=await User.create({
            username: username,
            password:hashedPassword});
        jwt.sign({userId:createdUser._id,username},jwtSecret,{}, (err,token)=>{
            if(err) throw err;
            res.cookie('token',token, {sameSite:'none', secure:true}).status(201).json({
                id: createdUser._id,
            });
        })
    } catch(err){
        if (err) throw err;
        res.status(500).json('error')
    }
    
})



mongoose.connect("mongodb://localhost:27017/chathive")
.then(app.listen(1234,()=>console.log(`server listening on port 1234...`)))
.catch(err=>console.log("error in DB connection",err))

