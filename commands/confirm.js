/* eslint-disable no-unused-vars */
module.exports = {
	name: 'confirm',
	finished : true,
	use: 'confirm (@mention)',
    description: "Confirmer un user et l'ajouté au role en ligne",
    modoOnly: true,
	execute(message, args) {
        const { modorole, confirmedrole, infoch } = require("../config.json");

        const member = message.member;

        let confirmedRole = message.guild.roles.find(role => role.id === confirmedrole);

        if(args.length < 1){
            message.channel.send("Il me faut la personne à confirmer");
        } else {
            const taggedMember = message.mentions.members.first();

            if(!(taggedMember.roles.some(role => role === confirmedRole))) {
                taggedMember.setRoles([confirmedRole], "Cette perssonne a été confirmé par " + member.user.username);
    
                const infoCh = message.guild.channels.find(channel => channel.id === infoch);
                infoCh.send(taggedMember.user.username + " a été confirmé par " + member.user.username);
    
                message.delete();
            } else {
                message.channel.send("Cette personne est déjà confirmer");
            }
        }
        
	},
};