const express = require('express')
const app = express()
const port = 3000
const qrcode = require("qrcode-terminal")

// const fs = require("fs")

// // const { Client, Location, Poll, List, Buttons, LocalAuth } = require('./index');
// const { Client } = require('whatsapp-web.js');


// const SESSION_FILE_PATH = "./session.json";
// let sessionCfg;
// if (fs.existsSync(SESSION_FILE_PATH)) {
//     sessionCfg = require(SESSION_FILE_PATH)
// }

// const client = new Client({
//     puppeteer: { 
//         headless: true
//     },
//     session :sessionCfg
// });

// client.initialize();

// client.on('qr', (qr) => {
//     // NOTE: This event will not be fired if a session is specified.
//     qrcode.generate(qr, { small: true });
// });


// // client.on('loading_screen', (percent, message) => {
// //     console.log('LOADING SCREEN', percent, message);
// // });


// client.on('authenticated', (session) => {
//     console.log('AUTHENTICATED',session);
//     sessionCfg  = session
//     fs.watchFile(SESSION_FILE_PATH,JSON.stringify(session),function(err){
//         if(err) {
//             console.log(err);
//         }
//     })
// });

// client.on('auth_failure', msg => {
//     // Fired if session restore was unsuccessful
//     console.error('AUTHENTICATION FAILURE', msg);
// });

// client.on('ready', () => {
//     console.log('READY');
// });

const { Client, LocalAuth } = require('./index');

const client = new Client({
    authStrategy: new LocalAuth(),
    // proxyAuthentication: { username: 'username', password: 'password' },
    puppeteer: { 
        // args: ['--proxy-server=proxy-server-that-requires-authentication.example.com'],
        headless: false
    }
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})