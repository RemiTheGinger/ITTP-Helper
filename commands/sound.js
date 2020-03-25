/* eslint-disable no-unused-vars */
module.exports = {
	name: 'sound',
    finished : false,
	use: 'sound [file]',
    description: 'Play Sound in voice channel',
    modoOnly: false,
	execute(message, args) {
        const voiceChannel = message.member.voiceChannel;

        const sounds = [];
        
        if(voiceChannel == null) {
            return console.log("Channel doesn't exist !");
        }

        voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.playFile("./Sounds/bruh.mp3");
                dispatcher.on("error", error => {
                    console.log(error);
                });
                dispatcher.on("start", function(){
                    console.log("playing !")
                });
                dispatcher.on("end", function(){
                    voiceChannel.leave();
                });
            })
            .catch(console.error);
	},
};