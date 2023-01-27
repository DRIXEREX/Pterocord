const { EmbedBuilder } = require('discord.js')

module.exports = async(client) => {
    const embed = new EmbedBuilder()
        .setTitle("⚠️ Une erreur est survenue")
        .setAuthor({ name: "Anti-Crash", url: "https://logger.drixerex.xyz/" })
        .setColor("Red")

    process.on("unhandledRejection", async (reason, p) => {
        console.log(reason, p)
        
        const channel = client.channels.cache.get("1045443582003249253")
        if(!channel) return

        channel.send({ embeds: [embed.setDescription(`**Unhandled Rejection/Catch :**\n\n\`\`\`${reason}\n${p}\`\`\``)] })
    })

    process.on("uncaughtException", async (err, origin) => {
        console.log(err, origin)

        const channel = client.channels.cache.get("1045443582003249253")
        if(!channel) return

        channel.send({ embeds: [embed.setDescription(`**Uncaught Exception/Catch :**\n\n\`\`\`${err}\n${origin}\`\`\``)] })
    })
}