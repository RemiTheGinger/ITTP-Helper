/* eslint-disable no-unusssed-vars */

/*
* Cette commande permet au membre de la guild de rejoindre le role MJ 
* et d'avoir accès au commande jeu de role.
* Cette action doit etre confirmé par un modérateurs
*/
module.exports = {
    name: "mj",
    finished: true,
    use: "mj",
    description: 'Te rendre MJ sur le serveur',
    modoOnly: false,
    execute(message, args){
        const { infoch, mjrole } = require("../config.json");

        const mj_role = message.guild.find(role => role.id === mjrole);
        const infoch = message.guild.find(channel => channel.id === infoch);

        if(message.member.roles.some(role => role === mj_role)){
            message.channel.send("Tu as déja le rôle MJ, vas tuez des joueurs !");
        } else{
            infoch.send(message.member.nickname + " veut devenir MJ")
                .then(function(message){
                    message.react('👍');
                    message.react('👎');
                }).catch(function (message){
                    //Something
                });
        }
    }
}