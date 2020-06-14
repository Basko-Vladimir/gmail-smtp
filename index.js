const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const SMTP_LOGIN = process.env.SMTP_LOGIN;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
let port = process.env.PORT || 3010;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SMTP_LOGIN,
        pass: SMTP_PASSWORD
    },
});

app.post('/https://portfolio-server-smtp-nodejs.herokuapp.com/', async function (req, res) {
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



app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});