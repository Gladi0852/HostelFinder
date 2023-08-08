//importing required module
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');
const mysql = require('mysql');
// const alert = require('alert');

//establishing connection with postgres
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root123',
        database: 'Hostel_Finder'
    }
})

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'hostel_finder'
});

connection.connect();
const app = express();
const router = express.Router();

//routing
let intialPath = path.join(__dirname, "public");
// app.use(express.static(path.join('public')));

app.use(bodyParser.json());
app.use(express.static(intialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "hostel_finder.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})
app.get('/vehicles', (req, res) => {
    res.sendFile(path.join(intialPath, "vehicles.php"));
})



//inserting registration form value
app.post('/register-user', (req, res) =>{
    const { name, email, password } = req.body;

    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else{
        db("register").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(["name", "email"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('Email already exists. Login now');
            }
        })
    }
})


//login after checking from database
app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('name', 'email')
    .from('register')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('Email or password is incorrect');
        }
    })
})


app.post('/post',(req,res)=>{
    const {name,phone, address,type,bedroom,bathroom,furnishing,allow,image} = req.body;

    connection.query('insert into property(name,phone, address,type,bedroom,bathroom,furnishing,allow,image) values(?,?,?,?,?,?,?,?,?)',[name,phone,address,type,bedroom,bathroom,furnishing,allow,image],(error)=>{
        // alert("Successfully Inserted...");
        res.sendFile(path.join(__dirname + '/public/index.html'));
    });
});


//server
app.listen(8000,'127.0.0.1',(req, res) => {
    console.log('listening on port 3000......')
})