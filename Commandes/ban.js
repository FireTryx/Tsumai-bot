const Discord = require("discord.js")

module.exports = {
    
    name: "ban",
    description: "💨 Bannir un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            name: "membre",
            type: "user",
            description: "Quel est le membre à bannir ?",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du bannissement",
            required: false
        }
    ],

    async run(bot, message, args) {

        try {
            
            let user = await bot.users.fetch(args._hoistedOptions[0].value)

            if(!user) return message.reply("Il n'y a pas de membre à bannir !");
            
            
            let reason = args.getString("raison");
            if(!reason) reason = "Il n'y a pas de raison fournie avec ce bannissement !";

            if(message.user.id === user.id) { 
                message.reply("Tu ne peut pas te bannir toi même");
            }
            
            try {
            if((await message.guild.fetchOwner()).id === user.id) {
                message.reply("Tu ne peut pas bannir le propriétaire du serveur, sans lui, ce serveur n'existerai pas");
                }
            } catch(err) {"Erreur"}

            let member = message.guild.members.cache.get(user.id);
            
            if(member && !member?.bannable) {
                message.reply("Je rencontre un problème, je n'arrive pas à bannir ce membre! Erreur 0x094");
            }

            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
                message.reply("Tu n'as pas l'autorisation de bannir ce membre");
            }
            
            if((await message.guild.bans.fetch()).get(user.id)) {
                message.reply("Ce membre est déjà banni !")
            }

            try {
                await user.send(`**Tu as été banni de ${message.guild.name} par ${message.user.tag} pour la raison : ${reason}**`)
            } catch(err) {}

            await message.reply(`${message.user.tag} a banni ${user.tag} pour la raison : ${reason}`)

            await message.guild.bans.create(user.id, {reason: reason})

        } catch(err) {"Erreur"}
    }
}