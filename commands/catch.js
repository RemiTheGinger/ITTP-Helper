/* eslint-disable no-unused-vars */
module.exports = {
    name: 'catch',
    finished: false,
    use: 'catch',
    description: "Tente d'attrapé un pokemon",
    modoOnly: true,
    execute(message, args) {
        const fs = require('fs');

        let rawdata = require('../curentMonster.json');

        for(var i = 0;  i < rawdata.catchers.length; i++){
            if(curentPokemon.catchers[i] == message.member.id){
                message.channel.send("Tu as déja capturé ce Monstre !");
            } else {

            }
        }
    }

}