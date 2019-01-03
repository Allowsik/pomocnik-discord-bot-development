const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Nie mogę znaleźć tego użytkownika!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Nie możesz tego zrobić :/");
    if(bUser.hasPermission(MANAGE_MESSAGES)) return message.channel.send("Tej osoby nie możesz zbanować!")

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Zbanowano", `<@${bUser.id}>`)
    .addField("Zbanowany przez", `<@{message.author.id}>`)
    .addField("Kiedy", message.createdAt)
    .addField("Powód", bReason)

    let banschannel = message.guild.channels.find(channel => channel.name === "logi");
    if (!banschannel) return message.channel.send("Nie można znaleźć kanału #logi!");

    message.guild.member(bUser).ban(bReason);
    banschannel.send(banEmbed);
    message.channel.send(`Zbanowano ${bUser}!`);
}

module.exports.help = {
    name: "ban"
}