module.exports = {
	name: 'help',
	finished : true,
	use: 'help',
	description: 'Une liste de toutes les commands du bot',
	modoOnly: false,
	execute(message, args, helpEmbed) {
		message.channel.send(helpEmbed);
	},
};