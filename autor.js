const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let aicon = bot.user.displayAvatarURL;
        let autorembed = new Discord.RichEmbed()
        .setDescription("**Informacje o autorze**")
        .setColor("#b2e820")
        .setThumbnail(aicon)
        .addField("Autor", `Allowsik#8019 *(<@218279848857174016>)*`)
        .addField("Potrzebujesz pomocy? Dołacz na tego discorda", `https://discord.gg/R9sRuxG`)

         return message.channel.send(autorembed);
}

module.exports.help = {
    name: "autor"
}
