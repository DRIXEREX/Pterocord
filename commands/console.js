const axios = require('axios')
const { NodeactylClient } = require('nodeactyl')
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const { Reply } = require('../utils/Reply')

module.exports = {
    name: "console",
    description: "Commandes pour la console d'un serveur",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "envoyer",
            description: "Permet d'envoyer une commande sur un serveur",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "id",
                    description: "UUID ou l'identifiant du serveur.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "commande",
                    description: "Commande à envoyer sur la console.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        }
    ],
    async execute(client, interaction, serverid, apikey) {
        switch(interaction.options.getSubcommand()) {
            case "envoyer": {
                const id = interaction.options.getString("id")
                const msg = interaction.options.getString("commande")

                try {
                    const panel = new NodeactylClient(serverid, apikey);
        
                    panel.sendServerCommand(id, msg).then(() => {
                        return Reply(interaction, "✅", `J'ai bien envoyé \`${msg}\` sur la console !`, true)
                    }).catch(err => { 
                        if(err === 404) return Reply(interaction, "❌", "Le serveur n'a pas été trouvé !", true)
                    })
                } catch(err) {
                    if(err === 403) return Reply(interaction, "❌", "La clé API est invalide !", false)
                    else return Reply(interaction, "❌", "Le serveur n'est pas allumé ! Ou un autre erreur majeur est survenue.", false)

                }
            }   break;
        }
    }
}