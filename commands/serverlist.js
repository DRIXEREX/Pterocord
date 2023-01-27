const axios = require('axios')
const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const { Reply } = require('../utils/Reply')
const { NodeactylClient } = require('nodeactyl')
const { cpu } = require('node-os-utils')


module.exports = {
    name: "serverlist",
    description: "Permet d'afficher vos serveurs.",
    permissions: ["UseApplicationCommands"],
    async execute(client, interaction, serverid, apikey) {
        try {
            const panel = new NodeactylClient(serverid, apikey);

            const data = await panel.getAllServers();

            const embed = new EmbedBuilder()
                .setTitle("Tous les serveurs")
                .setDescription(`Nombres de serveurs : \`${data.meta.pagination.total}\``)
                .setFooter({text: client.footer})
                .setColor(client.color)

            let i = 1;

            data.data.forEach(servers => {
                const server = servers.attributes;
                
                embed.addFields(
                    {
                        name: `Serveur n°${i++}`,
                        value: `
                        > **Nom du serveur :** \`${server.name}\`
                        > **UUID :** \`${server.uuid}\`
                        > **RAM :** \`${server.limits.memory}\`
                        > **Base de données :** \`${server.feature_limits.databases}\`
                        > **Allocations :** \`${server.feature_limits.allocations}\`
                        `,
                        inline: false
                    }
                )
            })

            return interaction.reply({ embeds: [embed] })

        } catch(err) {
            if(err === 403) return Reply(interaction, "❌", "La clé API est invalide !")
        }
    }
}