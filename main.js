var io = require('socket.io')(8000);

io.on('connection', handler);


function handler(socket){
    socket.on('message', function(msg){
        console.log(msg);
        socket.send(msg);
    });

    socket.on('disconnect', function (){
        console.log('disconnect');
    })
}
