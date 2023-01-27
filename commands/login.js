const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const config = require('../models/config')

module.exports = {
    name: "login",
    description: "Permet de s'enregistrer.",
    permissions: ["UseApplicationCommands"],
    options: [
        {
            name: "key",
            description: "La clé API.",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async execute(client, interaction) {
        const key = interaction.options.getString("key")

        if(await(config.findOne({ User: interaction.user.id }))) return interaction.reply({ content: "Vous êtes déjà enregistré !", ephemeral: true  })
    
        new config({
            User: interaction.user.id,
            APIKey: key
        }).save()

        return interaction.reply({ content: "Vous avez été enregistré dans la base de données avec succès !", ephemeral: true })
    }
}