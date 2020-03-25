/* eslint-disable no-unused-vars */
module.exports = {
	name: 'citation',
	finished : false,
	use: 'citation [message url]',
	description: "Ajouté une citation d'un user du serveur ou poste une citation déja ajouté",
	modoOnly: false,
	execute(message, args) {
        const fs = require('fs');

		const citationFile = fs.readFileSync("./ciatation")
		

	},
};