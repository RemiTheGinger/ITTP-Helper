/* eslint-disable no-unused-vars */
module.exports = {
	name: 'rnd',
	finished : true,
	use: 'rnd',
    description: 'random number',
    modoOnly : false,
	execute(message, args) {
        const fs = require('fs');

        const splashFile = fs.readFileSync("./splash.txt").toString().split("\n");
        var rndText = splashFile[Math.floor(Math.random() * splashFile.length)];

        //TODO Add auto file count on randomizer

        //Random image from folder
        var number = Math.floor((Math.random() * 3) + 1);

        fs.readdirSync("./files").forEach(file => {

            const stats = fs.statSync("./files/" + file);
            const fileName = file.split(".");

            if(fileName[0] == number && stats.size <= 8000000){
                message.channel.send(rndText ,{files: [{
                    attachment: './files/' + file,
                    name: file
                }]});
            }
        });

	},
};