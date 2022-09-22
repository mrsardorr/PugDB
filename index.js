const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

const users = []

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'pug')
app.set('views','views')

app.get('/',(req,res)=>{
    res.render('users',{
    })
})
app.get('/addUser',(req,res)=>{
    res.render('add',{
    })
})
app.post('/add/user',async (req,res)=>{
    const user = {
        username: req.body.username,
        password: req.body.password,
        id: users.length + 1
    }

    const data = await new Promise((resolve, reject)=>{
        fs.readFile(path.join(__dirname,'database', 'db.json'), 
       'latin1', 
        (err, data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })

    const testt = data.replace(' " ',"")
    users.push(user)
    if(testt) users.push(testt)
    

    
    // console.log(data);

    await new Promise((resolve, reject)=>{
        fs.writeFile(path.join(__dirname,'database', 'db.json'), 
        JSON.stringify(users), 
        (err)=>{
            if(err) reject(err)
            resolve()
        })
    })

    res.status(201).send('User created')
    res.send(users)
    console.log(data)
})



app.listen(9999,()=>{
    console.log('port 9999')
})