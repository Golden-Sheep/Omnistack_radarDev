const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections , sendMessage} = require('../websocket');

module.exports = {
async findAll (request,response){
    const devs = await Dev.find();
    return response.json(devs);
},

async stroreDev (request, response) {

   
    const { github_username, techs,latitude,longitude} = request.body;


    let dev = await Dev.findOne({ github_username });

    if (!dev){

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login , avatar_url, bio } = apiResponse.data;
    
        const techsArray = parseStringAsArray(techs);

      
    
        const location = {
            type: 'Point',
            coordinates: [longitude,latitude],
        }
    
        dev =  await Dev.create ({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });

        const sendSocketMessageTo = findConnections(
            {latitude, longitude},
             techsArray,
        );

        console.log(sendSocketMessageTo);
        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    
    }


    return response.json(dev);

}

}