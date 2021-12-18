//MERN - MongoDb + Express + React + Node
//Development = Node.js Server + React Server
//Production  = Node.js Server + Static React Files

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mern-jwt-auth')
mongoose.connection.on('connected', () => console.log('Connected'));
mongoose.connection.on('error', () => console.log('Connection failed with - ',err));

app.post('/api/register', async (req,res)=>{
    
    console.log(req.body)
    try
    {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.json({status:'ok'}) 
    }
    catch (err)
    {
        res.json({status:'error', error: 'Email already exists in Database'}) 
    }      
})

app.post('/api/login', async (req,res)=>{
    
    console.log(req.body)

    const user = await User.findOne({
        email: req.body.email
    })

    console.log('Above!')
    console.log(user)
    console.log('Below!')
    if(!user)
    {
        return {status:'error', error: 'Invalid login'}
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if(isPasswordValid)
    {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            'secret123'
        )
        console.log(`Here inside isPasswordValid : ${token}`)
        return res.json({status:'ok',user: token}) 
    }
    else
    {
        return res.json({status:'error',user: false}) 
    }       
})

app.get('/api/quote', async (req,res)=>{
    
    const token = req.headers['x-access-token']
    
    try
    {
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email
        const user = await User.findOne({email: email})

        return res.json({status: 'ok',quote: user.quote})
    }
    catch(err)
    {
        console.log(err)
        res.json({status: 'error', error: 'Invalid Token'})
    }
})

app.post('/api/quote', async (req,res)=>{
    console.log('/n/nHere00!/n/n')
    const token = req.headers['x-access-token']
    
    try
    {
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email

        console.log("/nHere1!")
        console.log(req.body.quote)
        console.log("/nHere2!")

        await User.updateOne(
            {email: email}, 
            {$set: {quote: req.body.quote}}
        )

        return res.json({status: 'ok'})
    }
    catch(err)
    {
        console.log(err)
        res.json({status: 'error', error: 'Invalid Token'})
    }
})


app.listen(1337,()=>{
    console.log("Server started at port 1337")
})