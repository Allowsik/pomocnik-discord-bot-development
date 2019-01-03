const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Nie możesz tego zrobić.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Nie można znaleźć użytkownika.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Wybierz role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Nie można znaleźć roli.");

  if(!rMember.roles.has(gRole.id)) return message.reply("Ta osoba nie ma tej roli!");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`[*], straciłeś role ${gRole.name}.`)
  }catch(e){
    message.channel.send(`[*] dla <@${rMember.id}>, usunęliśmy mu role ${gRole.name}.`)
  }
}

module.exports.help = {
  name: "removerole"
}