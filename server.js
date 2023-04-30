const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body').default;
const Router = require('koa-router');
const cors = require('@koa/cors');
const WS = require('ws');
const Chat = require('./api/Chat')

const chat = new Chat();

const app = new Koa();
const router = new Router();

app.use(cors());

app.use(koaBody({
    urlencoded: true,
    multipart: true,
    json: true,
}));

router.get('/index', async (ctx) => {
    ctx.response.body = 'working';
});

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws, req) => {
    console.log('connected');

    ws.send(JSON.stringify({ type: 'message', data: 'message.data', user: 'message.user', time: 'time'}));

    ws.on('message', async (msg) => {
        const message = JSON.parse(msg);

        if (message.type === 'addUser') {
            if (chat.checkUser(message.data)) {
                chat.addUser(message.data);
                ws.send(JSON.stringify({ type: 'addUser', data: message.data}));
                //
                // ws.send(JSON.stringify({ type: 'addUser', data: 'user'}))
            } else {
                ws.send(JSON.stringify({ type: 'addUser', data: 'error'}));
            }
        } else if (message.type === 'message') {
            const time = chat.getCurrentDate();
            ws.send(JSON.stringify({ type: 'message', data: message.data, user: message.user, time: time}));
            //
            // ws.send(JSON.stringify({ type: 'deleteUser', data: 'user'}))
        } else if (message.type === 'deleteUser') {
            ws.send(JSON.stringify({ type: 'deleteUser', data: message.data}));
        }
    })
})
server.listen(port, () => console.log('working ' + port));
