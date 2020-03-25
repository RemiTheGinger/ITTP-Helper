/* eslint-disable no-unusssed-vars */

/*
* Cette commande permet au membre de la guild de rejoindre le role MJ 
* et d'avoir accès au commande jeu de role.
* Cette action doit etre confirmé par un modérateurs
*/
module.exports = {
    name: "mj",
    finished: false,
    use: "mj",
    description: 'Te rendre MJ sur le serveur',
    modoOnly: false,
    execute(message, args){
        const { mjrole } = require("../config.json");

        const mj_role = message.guild.find(role => role.id === mjrole);

        if(message.member.roles.some(role => role === mj_role)){
            message.channel.send("Tu as déja le rôle MJ");
        } else{
            message.member.addRole(mj_role);
            message.channel.send("Tu est devenu MJ");
        }
    }
}