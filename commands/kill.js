const axios = require('axios')
const { NodeactylClient } = require('nodeactyl')
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const { Reply } = require('../utils/Reply')

module.exports = {
    name: "kill",
    description: "Permet de tuer un serveur.",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "id",
            description: "UUID ou l'identifiant du serveur.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async execute(client, interaction, serverid, apikey) {
        const id = interaction.options.getString("id")

        try {
            const panel = new NodeactylClient(serverid, apikey);

            panel.killServer(id).then(() => {
                return Reply(interaction, "✅", "Le serveur vient d'être tuer !", true)
            }).catch(err => { 
                if(err === 404) return Reply(interaction, "❌", "Le serveur n'a pas été trouvé !", true)
            })
        } catch(err) {
            if(err === 403) return Reply(interaction, "❌", "La clé API est invalide !", true)
        }
    }
}