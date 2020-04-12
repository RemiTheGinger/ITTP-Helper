/* eslint-disable no-unused-vars */

const fs = require('fs'); //File reader and writer Library
const Discord = require('discord.js'); //Dicord API
const CronJob = require('cron').CronJob;
const { prefix, token, whitelistch, infoch, confirmedrole, initrole, countch, modorole, confinementrole } = require("./config.json"); //User set Variables

const client = new Discord.Client(); 
client.commands = new Discord.Collection();

//Update member count of a Guild & log to console
function updateMemberCount(guild) {
    const countCh = guild.channels.find(channel => channel.id === countch);
    const memberCount = guild.memberCount;

    countCh.setName("Membres : " + memberCount, "Updated member count");

    console.log("Updated member count of " + guild.name + " to " + memberCount);
}

//Help menu
const helpEmbed = new Discord.RichEmbed()
    .setColor('#00a1ff')
    .setAuthor('ITTP Helper', 'https://cdn.discordapp.com/icons/157566814853791744/b17ad81a661ad156158ba46112ea8220.png?size=256')
    .setFooter('Si vous avez des questions ou des demandes sur ce bot, contactez Rémi !');

//On Join event
client.on('guildMemberAdd', member => {

    //Auto init role
    member.addRole(member.guild.roles.find(role => role.id === initrole));

    //Message info channel
    const channel = member.guild.channels.find(channel => channel.id === infoch);
    channel.send(member.user.username + " nous a rejoins !");

    //Add to count
    updateMemberCount(member.guild);

});

//On Leave event
client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(channel => channel.id === infoch);

    channel.send(member.user.username + " nous a quité !");

    //Remove to count
    updateMemberCount(member.guild);
});

//On vocal join event
client.on('voiceStateUpdate', (oldMember, newMember) => {
    let oldUserChannel = oldMember.voiceChannel;
    let newUserChannel = newMember.voiceChannel;

    
    if(!oldUserChannel && newUserChannel){
        //!! ROLE CONFINEMENT !!
        if(!newMember.roles.some(role => role.id === confinementrole) && newMember.roles.some(role => role.id === confirmedrole)){
            newMember.addRole(newMember.guild.roles.find(role => role.id === confinementrole));
        }
    }
    
});

//Retrieve command files
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if(command.finished == true) {
        console.log(`Enabling ${command.name} command !`)
        client.commands.set(command.name, command);

        if(command.modoOnly == true) {
            helpEmbed.addField(prefix + command.use, command.description + " [Modo Only]");
        } else {
            helpEmbed.addField(prefix + command.use, command.description);
        }

    }
}

helpEmbed.addBlankField();

//Command Manager
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.id != whitelistch) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(client.commands.has(command)) {
        if(command === "help"){
            client.commands.get(command).execute(message, args, helpEmbed);
        }else {

            //Check if command needs modo role
            if(client.commands.get(command).modoOnly == true || client.commands.get(command).finished == false) {

                //Check if command author is modo of the Guild
                if(message.member.roles.some(role => role.id === modorole)) {
                    client.commands.get(command).execute(message, args);

                } else {
                    message.channel.send("Tu n'as pas la permission pour cette commande");
                }
            } else {
                client.commands.get(command).execute(message, args);
            }
        }
    } else {
        return;
    }
})

//Ready Info -- Conection made to websocket
client.once('ready', () => {
    console.log("Ready !");
});

client.login(token);