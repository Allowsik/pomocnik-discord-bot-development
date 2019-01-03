const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let sicon = message.guild.displayAvatarURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Informacje o serwerze")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Nazwa serwera", message.guild.name)
        .addField("Stworzono", message.guild.createdAt)
        .addField("Dołączyłeś", message.member.joinedAt)
        .addField("Ilość członków", message.guild.memberCount)

        return message.channel.send(serverembed)
}

module.exports.help = {
    name: "serverinfo"
}