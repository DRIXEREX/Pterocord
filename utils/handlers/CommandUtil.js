const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');
const { ApplicationCommandType } = require('discord.js')

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/commands/*.js`)).map(async (cmdFile) => {
        const cmd = require(cmdFile);

        if (!cmd.name) return Logger.warn(`Commande  non-chargée: pas de nom ↓\nFichier -> ${cmdFile}`);

        if (!cmd.description) return Logger.warn(`Commande  non-chargée: pas de description ↓\nFichier -> ${cmdFile}`);
        
        client.commands.set(cmd.name, cmd);
        Logger.command(`Command chargé: ${cmd.name}`);
    })
}

