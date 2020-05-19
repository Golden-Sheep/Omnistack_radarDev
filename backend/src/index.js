const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.Server(app);
const { setupWebsocket } = require ('./websocket');

const routes =  require('./routes'); // importando as rotas do routes.js




app.use(cors());
app.use(express.json());
app.use(routes);
setupWebsocket(server); 

mongoose.connect('mongodb+srv://root:ifsp@cluster0-zcb5x.gcp.mongodb.net/appReact?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});



server.listen(3333);


