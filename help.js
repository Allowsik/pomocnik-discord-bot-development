const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let hicon = bot.user.displayAvatarURL;
  let helpembed = new Discord.RichEmbed()
  .setDescription("**Lista komend**")
  .setColor("#42f4c8")
  .setThumbnail(hicon)
  .addField("Informacje", "`botinfo`, `serverinfo`, `autor`")
  .addField("Moderacja", "`kick`, `ban`, `report`, `tempmute`, `addrole`, `removerole`, `prefix`")
  .addField("Zabawa", "`pies`, `kot`, `8ball`")
  .addField("Potrzebujesz pomocy? Dołacz na tego discorda", `https://discord.gg/R9sRuxG`);

  return message.channel.send(helpembed);
}

module.exports.help = {
    name: "help"
}
