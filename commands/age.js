module.exports = {
    name: 'age',
    finished : true,
    use: 'age [@mention]',
    description: "Savoir l'age de quelqu'un sur le serveur",
    modoOnly : false,
	execute(message, args) {

        // eslint-disable-next-line no-unused-vars
        const member = message.member;

        var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];

		if(args.length == 0){
            const bday = `Tu a rejoins le serveur le ${member.joinedAt.getDate()} ${months[member.joinedAt.getMonth()]} ${member.joinedAt.getFullYear()}`;

            message.channel.send(bday);
        }else if(args.length >= 1) {
            const taggedMember = message.mentions.members.first();
            const taggedBday = `${taggedMember.user.username} a rejoins le serveur le ${taggedMember.joinedAt.getDate()} ${months[taggedMember.joinedAt.getMonth()]} ${taggedMember.joinedAt.getFullYear()}`;

            message.channel.send(taggedBday);
        }
	},
};