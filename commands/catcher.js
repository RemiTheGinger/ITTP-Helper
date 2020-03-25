/* eslint-disable no-unused-vars */
module.exports = {
    name: 'catcher',
    finished: false,
    use: 'catcher',
    description: "Rejoindre le role des catcher",
    modoOnly: false,
    execute(message, args) {
        const { catcherrole } = require("../config.json");

        const member  = message.member;

        let catcherRole = message.guild.roles.find(role => role.id === catcherrole);

        if(!(member.roles.some(role => role === catcherRole))) {
            member.addRole(catcherRole, "Cette personne a rejoint le role Cather")
                .catch(console.error);
        } else {
            member.removeRole(catcherRole, "Cette personne a quité le role Cather")
                .catch(console.error);
        }
    },
};