/* eslint-disable no-unused-vars */
module.exports = {
	name: 'ping',
	finished : true,
	use: 'ping',
	description: 'Pong !',
	modoOnly: false,
	execute(message, args) {
		message.channel.send('Pong !');
	},
};