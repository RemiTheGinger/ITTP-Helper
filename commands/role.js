module.exports = {
    name: 'role',
    finished : true,
    use: 'role normie | weeb | none',
    description: 'Changer de role sur le serveur !',
    modoOnly : false,
	execute(message, args) {
        const member = message.member;
        const guild = message.guild;

        const normie_role = guild.roles.find(role => role.name === "Normies");
        const weeb_role = guild.roles.find(role => role.name === "Weebs");


		if(!args.length) {
            message.channel.send(`Quel role voulez vous rejoindre ?\nLes Weebs ou les Normies :fire:`);
        }else if(args[0] === "normies" || args[0] === "normie"){
            if(member.roles.some(role => role.name === "Weebs")){
                member.removeRole(weeb_role);
            }
            member.addRole(normie_role);
            member.send(":fire: :100: Bravo, tu est maintenant un Normies :100: :fire:");

            message.delete();
        }else if(args[0] === "weebs" || args[0] === "weeb"){
            if(member.roles.some(role => role.name === "Normies")){
                member.removeRole(normie_role);
            }
            member.addRole(weeb_role);
            member.send("＼(^ω^＼) Bravo, tu est maintenant un Weeb ＼(^ω^＼)");

            message.delete();
        }else if(args[0] === "none"){
            if(member.roles.some(role => role.name === "Normies")){
                member.removeRole(normie_role);
            }
            if(member.roles.some(role => role.name === "Weebs")){
                member.removeRole(weeb_role);
            }

            message.delete();
        }
    }
}