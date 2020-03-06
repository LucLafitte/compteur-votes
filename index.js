const app = require('express')()
var http = require("http").createServer(app)
var io = require("socket.io")(http)


// On déclare les variables de votes
var antoineVote = 0;
var leonieVote = 0;
var sorayaVote = 0;
var maximeVote = 0;
var nombreCo = 0 ; // Variable qui compte le nombre de personnes connectés


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
io.sockets.on("connection", function (socket) {
    nombreCo++;
    socket.emit('jeSuisConnecte', nombreCo)
    socket.on("vote", function (){

        if(socket == "Antoine"){
             antoineVote++; // On incrémente la variable antoine
             socket.broadcast.emit('oui', antoineVote);
             socket.emit('oui', antoineVote); // On la retrourne sur index.html avec ces deux lignes 
         }else if(socket == "Leonie"){
             leonieVote++; // On incrémente la variable leonie
             socket.broadcast.emit('oui1', leonieVote);
             socket.emit('oui1', leonieVote); // On la retrourne sur index.html avec ces deux lignes 
         }else if(socket == "Soraya"){
             sorayaVote++; // On incrémente la variable soraya
             socket.broadcast.emit('oui2', sorayaVote);
             socket.emit('oui2', sorayaVote); // On la retrourne sur index.html avec ces deux lignes 
         }else if(socket == "Maxime"){
             maximeVote++; // On incrémente la variable maxime
             socket.broadcast.emit('oui3', maximeVote);
             socket.emit('oui3', maximeVote); // On la retrourne sur index.html avec ces deux lignes 
         }
    })
})

io.sockets.on("Unconnection", function (socket) {
    nombreCo--;
    socket.emit('jeSuisDeconnecte', nombreCo)
})

http.listen(3000, function () {
    //console.log("connect")
})