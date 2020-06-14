const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


const whitelist = ['http://localhost:3000', 'https://basko-vladimir.github.io/Portfolio'];
app.use(cors({
    origin: whitelist,
    methods: "GET,PUT,POST,DELETE, OPTIONS",
    preflightContinue: true,
    optionsSuccessStatus: 204
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    if(whitelist.indexOf(req.headers.origin) > -1) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// let smtp_login = process.env.SMTP_LOGIN || '---';
// let smtp_password = process.env.SMTP_PASSWORD || '---';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '1989bvg@gmail.com',
        pass: "Bas'ko_190389"
    },
});

app.get('/', async function (req, res) {
   res.send('Hello world');
});

app.post('/sendMessage', async function (req, res) {
    const {message, name, email} = req.body;
    console.log(message,name, email )
    await transporter.sendMail({
        from: `HR\'s message trough my portfolio`,
        to: '1989bvg@gmail.com',
        subject: `HR's message trough my portfolio`,
        // text: "Hello world?",
        html: `<div>Name: ${name}</div>
               <div>E-mail: ${email}</div>
               <div>Message: ${message}</div>`
    });

    res.send(`Message sent!`)
});

let port = process.env.PORT || 3010;

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});