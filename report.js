const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Nie mogę znaleźć tego użytkownika!");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Zgłoszenia")
    .setColor("#15f153")
    .addField("Zgłoszony gracz", `${rUser}`)
    .addField("Zgłoszony przez", `${message.author}`)
    .addField("Kanał", message.channel)
    .addField("Kiedy", message.createdAt)
    .addField("Powód", rreason);

    let reportschannel = message.guild.channels.find(channel => channel.name === "logi");
    if(!reportschannel) return message.channel.send("Nie można znaleźć kanału #logi");

    message.delete().catch(O_o=>{});
    message.channel.send(`Zgłoszono użytkownika! **${rUser}**`);
    reportschannel.send(reportEmbed);
};

module.exports.help = {
    name: "report"
};