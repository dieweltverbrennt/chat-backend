const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body').default;
const router = require('./routes/routes');
const cors = require('@koa/cors');
const WS = require('ws');
const Chat = require('./api/Chat')

const app = new Koa();
const chat = new Chat();

app.use(koaBody({
    urlencoded: true,
    multipart: true,
    json: true,
}));

app.use(cors());

app.use(router());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws) => {
    console.log(ws);
    const errCallback = (err) => {
      if (err) {
        console.log(err);
      }
    }

    const sending = (data) => {
        [...wsServer.clients]
          .filter((client) => client.readyState === WS.OPEN)
          .forEach((client) => client.send(data, errCallback));
      }


    ws.on('message', async (msg) => {
        const message = JSON.parse(msg);

        if (message.type === 'addUser') {
            if (chat.checkUser(message.data)) {
                chat.addUser(ws, message.data);
                sending(JSON.stringify({ type: 'addUser', data: message.data}))
            } else {
                sending(JSON.stringify({ type: 'addUser', data: 'error'}));
            }
        }
        else if (message.type === 'message') {
            const time = chat.getCurrentDate();
            sending(JSON.stringify({ type: 'message', data: message.data, user: message.user, time: time}));
        } else if (message.type === 'activeUsers') {
            sending(JSON.stringify({ type: 'activeUsers', data: chat.getActiveClients()}));
        }
    });

    ws.on('close', () => {
        chat.deleteUser(ws);
        sending(JSON.stringify({ type: 'activeUsers', data: chat.getActiveClients()}));
    });
})
server.listen(port, () => console.log('working ' + port));
