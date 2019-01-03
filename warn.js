const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Nie możesz tego zrobić!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Nie można znaleźć użytkownika.");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie możesz dać ostrzeżenia tej osobie");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Ostrzeżenia")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Ostrzeżony użytkownik", `<@${wUser.id}>`)
  .addField("Ostrzeżony na kanale", message.channel)
  .addField("Liczba ostrzeżeń", warns[wUser.id].warns)
  .addField("Powód", reason);

  let warnchannel = message.guild.channels.find(`name`, "logi");
  if(!warnchannel) return message.reply("Nie można znaleźć kanału #logi");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 3){
    let muterole = message.guild.roles.find(role => role.name === "muted");
    if(!muterole) return message.reply("Rola `muted` nie istnieje.");

    let mutetime = "60s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> został wyciszony chwilowo`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> odzyskał mowę.`);
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 100){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> został zbanowany.`);
  }

}

module.exports.help = {
  name: "warn"
}
