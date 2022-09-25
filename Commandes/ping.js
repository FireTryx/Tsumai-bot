const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "Permet de connaître la latence du Bot",
    permission: "Aucune",
    dm: true,

    async run(bot, message, args) {
        
        await message.reply(`Ping : \`${bot.ws.ping}\``)
    }
}