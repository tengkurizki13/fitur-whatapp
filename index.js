const express = require('express')
const app = express()
const port = 3000
const qrcode = require("qrcode-terminal")


const { Client, LocalAuth } = require('whatsapp-web.js');


const allSessionsObject = {}
const client = new Client({
    puppeteer: { headless: false},
    authStrategy: new LocalAuth({ clientId: 'client-one' })
    
});
 

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    qrcode.generate(qr, { small: true });
});

// client.on('auth_failure', msg => {
    //     // Fired if session restore was unsuccessful
    //     console.error('AUTHENTICATION FAILURE', msg);
    // });
    
client.on('ready', () => {
    console.log('READY');
});

client.initialize();

app.get('/', async (req, res) => {
    console.log("amasuk");
    let nomer = "62897373107@c.us"
    let pesan = "halo bos"

    let cekUser = await client.isRegisteredUser(nomer)

    if (cekUser == true) {
        client.sendMessage(nomer,pesan)
        res.json({satsus: "berhasil"})
    }else{
        res.json({satsus: "gagal"})

    }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})