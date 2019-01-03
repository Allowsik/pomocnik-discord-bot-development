const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!args[2]) return message.reply("Zadaj pełne pytanie..");
  let replies = ["Tak.", "Nie.", "Możliwe.", "Raczej tak.", "Nie wiem.", "Raczej nie.", "Oczywiście!", "Zdecydowanie tak!", "Zdecydowanie nie!"];

  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");

  let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#FF9900")
    .addField("Pytanie", question)
    .addField("Odpowiedź", replies[result]);

    message.channel.send(ballembed);
}

module.exports.help = {
  name: "8ball"
}
