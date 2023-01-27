const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "ping",
    description: "Permet de savoir le ping du bot.",
    permissions: ["UseApplicationCommands"],
    async execute(client, interaction) {
        const tryPong = await interaction.reply({ content: "Obtention des résultats...", fetchReply: true })

        tryPong.edit({ content: null, embeds: [
            new EmbedBuilder()
                .setTitle(`Ping de ${client.user.username}`)
                .setDescription(
                `> **Ping du bot :** \`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`
                > **Ping de l'API :** \`${client.ws.ping}ms\``
                )
                .setTimestamp()
                .setColor(client.color)
                .setFooter({text: client.footer})
        ] })
    }
}