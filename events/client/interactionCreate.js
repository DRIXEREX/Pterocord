const { EmbedBuilder, InteractionType, ChannelType } = require('discord.js')
const { Reply } = require('../../utils/Reply')
const { panelURL } = require('../../config.json')
const Logger = require('../../utils/Logger')
const config = require('../../models/config')

module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {
        if (interaction.type === InteractionType.ApplicationCommand || interaction.isUserContextMenuCommand()) {
            const cmd = client.commands.get(interaction.commandName);

            if (!cmd) {
                Reply(interaction, "❌", "Cette commande n'existe pas !", true)
                client.commands.delete(interaction.commandName)
                return;
            }

            Logger.used(`${interaction.guild.name} | ${interaction.guildId} | ${interaction.user.tag} (${interaction.user.id})`, `${interaction.commandName.toUpperCase()}`)

            if (!interaction.member.permissions.has([cmd.permissions])) {
                const embed = new EmbedBuilder()
                    .setTitle("Vous n'avez pas la/les permission(s) requise(s) pour executer cette commande.")
                    .setColor(client.color)

                return interaction.reply({ embeds: [embed] })
            }

            if (!interaction.guild.members.cache.get(client.user.id).permissions.has([cmd.permissions])) {
                const embed = new EmbedBuilder()
                    .setTitle("Je n'ai pas la/les permission(s) requise(s) pour executer cette commande. Merci de mettre mon rôle tout en haut ou modifier mes permissions.")
                    .setColor(client.color)

                return interaction.reply({ embeds: [embed] })
            }

            const serverid = panelURL

            const api = await config.findOne({ User: interaction.user.id })

            if(interaction.commandName === "login") {
                return cmd.execute(client, interaction);
            } else {
                if(!api) return interaction.reply({ content: "Vous ne pouvez pas utiliser le bot, car vous n'avez pas enregistrer de clé API, pour mettre votre clé API, veuillez faire la commande `/login` en message privé.", ephemeral: true })

                const apikey = api.APIKey

                return cmd.execute(client, interaction, serverid, apikey);
            }

        } else if (interaction.isButton()) {
            const btn = client.buttons.get(interaction.customId);
            if (!btn) return
            btn.execute(client, interaction);
        } else if (interaction.type === InteractionType.ModalSubmit) {
            const Modals = client.modals.get(interaction.customId);
            if (!Modals) return Error(interaction, "Ce Modal n'est pas défini !")
            Modals.execute(client, interaction);
        } else if (interaction.isSelectMenu()) {
            const SelectMenu = client.selects.get(interaction.customId);
            if (!SelectMenu) return Error(interaction, "Ce Select Menu n'est pas défini !")
            SelectMenu.execute(client, interaction);
        }
    }
}