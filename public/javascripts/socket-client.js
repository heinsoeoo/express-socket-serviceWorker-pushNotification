var url = window.location.origin;
var socket = io.connect(url);

socket.on('init', data => {
    console.log(data.msg)
    socket.emit('subscription', subObject);
});