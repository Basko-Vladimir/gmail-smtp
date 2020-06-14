const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

let smtp_login = process.env.SMTP_LOGIN;
let smtp_password = process.env.SMTP_PASSWORD;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login,
        pass: smtp_password
    },
});

app.get('/', async function (req, res) {
   res.send('Hello world');
});

app.post('/sendMessage', async function (req, res) {
    const {message, name, email} = req.body;
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