const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Nie mogę znaleźć tego użytkownika!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nie możesz tego zrobić :/");
    if(kUser.hasPermission(MANAGE_MESSAGES)) return message.channel.send("Tej osoby nie możesz wyrzucić!")

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Wyrzucono", `<@${kUser.id}>`)
    .addField("Wyrzucony przez", `<@{message.author.id}>`)
    .addField("Kiedy", message.createdAt)
    .addField("Powód", kReason)

    let kickschannel = message.guild.channels.find(channel => channel.name === "logi");
    if (!kickschannel) return message.channel.send("Nie można znaleźć kanału #logi!");

    message.guild.member(kUser).kick(kReason);
    kickschannel.send(kickEmbed);
    message.channel.send(`Wyrzucono ${kUser}!`);
}

module.exports.help = {
    name: "kick"
}