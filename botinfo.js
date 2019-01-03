const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("**Informacje o bocie**")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Nazwa Bota", bot.user.username)
        .addField("Data stworzenia", bot.user.createdAt)

         return message.channel.send(botembed);
}

module.exports.help = {
    name: "botinfo"
}