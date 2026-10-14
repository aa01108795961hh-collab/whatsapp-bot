hereconst { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const app = express();

let qrCodeData = '';

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', async (qr) => {
    qrCodeData = await qrcode.toDataURL(qr);
    console.log('امسح الـ QR من هنا:');
});

client.on('ready', () => {
    console.log('البوت اشتغل!');
});

client.on('message', async (msg) => {
    if (msg.body === 'hi' || msg.body === 'هاي') {
        msg.reply('اهلا بيك! البوت شغال ✅');
    }
});

app.get('/', (req, res) => {
    if (qrCodeData) {
        res.send(`<h1>امسح الكود بواتساب</h1><img src="${qrCodeData}">`);
    } else {
        res.send('<h1>البوت شغال ✅</h1>');
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});

client.initialize();
