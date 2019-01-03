const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie możesz tego zrobić.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Nie można znaleźć użytkownika.");
  let warnlevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> posiada ${warnlevel} ostrzeżeń.`);

}

module.exports.help = {
  name: "warnlevel"
}