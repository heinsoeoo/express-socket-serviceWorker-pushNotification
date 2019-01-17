const socketIO = require('socket.io');
const webPush = require('./web-pusher');
require('custom-env').env();

module.exports = (server) => {
    io = socketIO(server);

    io.on('connection', socket => {
        console.log('A connection established');
        socket.emit('init', {msg: 'connected'});

        socket.on('subscription', subObject => {
            setTimeout(() => {
                webPush.sendNotification(
                    subObject,
                    JSON.stringify({message: 'Hi There! Testing Notification', url:process.env.APP_URL})
                ).catch(err => console.error(err));
            }, 10000)
        })
    })

    return io;
}