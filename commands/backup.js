const axios = require('axios')
const { NodeactylClient } = require('nodeactyl')
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const { Reply } = require('../utils/Reply')

module.exports = {
    name: "backup",
    description: "Commandes pour la gérer les backups d'un serveur",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "créer",
            description: "Permet de créer une backup sur un serveur",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "id",
                    description: "UUID ou l'identifiant du serveur.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    async execute(client, interaction, serverid, apikey) {
        switch(interaction.options.getSubcommand()) {
            case "créer": {
                const id = interaction.options.getString("id")

                try {
                    const panel = new NodeactylClient(serverid, apikey);
        
                    panel.createServerBackup(id).then(() => {
                        return Reply(interaction, "✅", `J'ai bien créer une backup sur ce serveur !`, true)
                    }).catch(err => { 
                        if(err === 404) return Reply(interaction, "❌", "Le serveur n'a pas été trouvé !", true)
                    })
                } catch(err) {
                    if(err === 403) return Reply(interaction, "❌", "La clé API est invalide !", false)
                    else {
                        Reply(interaction, "❌", "Une erreur est survenue", false)
                        return console.log(err)
                    }

                }
            }   break;
        }
    }
}