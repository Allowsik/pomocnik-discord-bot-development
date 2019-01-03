const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!addrole @user role
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Nie możesz tego zrobić.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Nie można znaleźć użytkownika.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Wybierz role!");
  let gRole = message.guild.roles.find(role => role.name === role);
  if(!gRole) return message.reply("Nie można znaleźć tej roli.");

  if(rMember.roles.has(gRole.id)) return message.reply("Ta osoba ma już tę rolę.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Gratulacje dałeś rolę ${gRole.name}`)
  }catch(e){
    message.channel.send(`Gratulacje dla <@${rMember.id}>, dał/a on/a rangę ${gRole.name}.`)
  }
}

module.exports.help = {
  name: "addrole"
}