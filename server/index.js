console.log('starting');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {nanoid} = require('nanoid');
const serverURL = process.env.SERVER_URL || 'http://localhost:4444'
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:3000", "http://192.168.0.186:3000"],
        methods: ["GET", "POST"]
    }
});
app.use(express.static(__dirname + "/../build/"));

app.get('/ws', (req, res) => res.json({
    endpoint: serverURL, //// 'https://cine.stream' //'http://192.168.0.186:5000'
}))
app.get('/:param', (req, res) => res.sendFile(__dirname + '/index.html'));

server.listen(4444, () => {
    console.log('listening on *:4444');
});

let avatars = {};
let userToRooms = [];
let rooms = {};
const COLORS = ['aqua', 'coral', 'mustard', 'orange', 'pastel', 'purple', 'turq']

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.emit('auth', socket.id);
    socket.on('disconnect', () => {
        console.log('disconnect', socket.id);
        delete avatars[socket.id];
    })
    let roomid = '';

    socket.on('location', data => {
        if (!rooms[roomid]) {
            console.log({roomid});
            // return;
            return socket.emit('closedroom');
        }

        rooms[roomid].avatars[socket.id] = {...data, color: rooms[roomid].usernames[socket.id]?.avatar || 'undefined'};
        socket.to(roomid).emit('avatars', rooms[roomid].avatars)
    })

    socket.on('chat', async chat => {
        if (chat.message.length === 0) return;
        if (chat.message.includes('<') && chat.message.includes('>')) return;
        // await getImage(chat.username)
        let obj = {
            message: chat.message,
            image: rooms[roomid].usernames[socket.id].avatar,
            username: rooms[roomid].usernames[socket.id].username,
        };
        io.emit('chat', obj)
    })
    socket.on('auth', async (data) => {
        console.log('auth', data);
        sync(roomid);
        console.log(data);
        if (data.newRoom) {
            roomid = nanoid(8);
            socket.emit('room', roomid)
            rooms[roomid] = {usernames: {}, avatars: {}, currentStatus: currentStatus};
            console.log(rooms[roomid]);
            rooms[roomid].usernames = {};
            rooms[roomid].usernames[socket.id] = data;
            rooms[roomid].usernames[socket.id].avatar = COLORS[0];
        } else {
            roomid = data.roomID
            rooms[roomid].usernames[socket.id] = data;
            rooms[roomid].usernames[socket.id].avatar = COLORS[Object.keys(rooms[roomid].usernames).length % 8];
        }
        userToRooms[socket.id] = roomid
        console.log(data);

        let obj = {
            message: '',
            image: rooms[roomid].usernames[socket.id].avatar,
            username: rooms[roomid].usernames[socket.id].username + ' joined'
        };
        socket.join(roomid);
        io.emit('chat', obj)
    })
    socket.on('sync', () => {
        sync(roomid);
    })
    socket.on('disconnect', async () => {
        if (!roomid) return;
        let obj = {
            message: '',
            image: userToRooms[socket.id].avatar,
            username: userToRooms[socket.id].username + ' left'
        };
        io.emit('chat', obj)
    })
    socket.on('update', (obj) => {
        console.log(obj);
        rooms[roomid].currentStatus.src = obj.src;
        rooms[roomid].currentStatus.type = obj.type || "file";
        rooms[roomid].currentStatus.currentTime = obj.currentTime;
        rooms[roomid].currentStatus.timestamp = Date.now();
        rooms[roomid].currentStatus.paused = obj.paused;
        sync(roomid);
    })
    socket.on('set-movie', data => {
        rooms[roomid].currentStatus.src = data;
        rooms[roomid].currentStatus.currentTime = 0;
        rooms[roomid].currentStatus.type = 'file';
        sync(roomid);
    })
    socket.on('set-twitch', data => {
        rooms[roomid].currentStatus.src = data;
        rooms[roomid].currentStatus.currentTime = 0;
        rooms[roomid].currentStatus.type = 'twitch';
        sync(roomid);
    })

});

let currentStatus = {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    currentTime: 5,
    type: "file",
    timestamp: Date.now(),
    paused: true
}

function sync(roomid) {
    let now = Date.now()
    if (!rooms[roomid]) {
        rooms[roomid] = {usernames: {}, avatars: {}, currentStatus: currentStatus};
    }
    if (rooms[roomid].currentStatus.type === "file" && !rooms[roomid].currentStatus.paused) {
        rooms[roomid].currentStatus.currentTime += (now - rooms[roomid].currentStatus.timestamp) / 1000;
        rooms[roomid].currentStatus.timestamp = now;
    }
    // console.log(rooms[roomid].currentStatus);
    console.log('to:', roomid, rooms[roomid].currentStatus);
    io.to(roomid).emit('status', rooms[roomid].currentStatus);

}

async function getData(username) {
    return {
        name: "USERNAME CONSTANT",
        avatar: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=Black&clotheType=ShirtVNeck&clotheColor=Heather&eyeType=Wink&eyebrowType=SadConcerned&mouthType=Eating&skinColor=Light"
    };
}
