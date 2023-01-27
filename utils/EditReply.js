const { EmbedBuilder } = require("discord.js");

async function EditReply(interaction, emoji, description, type) {
    if(!interaction) return console.log("Il n'y a pas la variable interaction !")
    
    await interaction.editReply({ content: null, embeds: [
        new EmbedBuilder()
            .setDescription(`${emoji} | ${description}`)
            .setColor("Green")], ephemeral: type })
} 

module.exports = { EditReply };