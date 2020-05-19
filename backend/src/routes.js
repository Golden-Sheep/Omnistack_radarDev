const  { Router } = require('express'); // importando apenas o Router de dentro do express
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/dev/listAll',DevController.findAll);
routes.post('/dev/create', DevController.stroreDev);

routes.get('/dev/search',SearchController.index);

module.exports = routes; // exportando routes para que o resto do projeto possa usala 