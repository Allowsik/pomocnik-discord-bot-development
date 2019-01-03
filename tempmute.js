const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    // >tempmute @user 1s/m/h/d

    let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!tomute) return message.reply("Nie można znaleźć użytkownika.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie możesz wyciszyć tej osoby!");
    let muterole = message.guild.roles.find(roles => roles.name === "muted");
    //start of create role
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermission(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    // end of create role
    let mutetime = args [1];
    if(!mutetime) return message.reply("Nie określiłeś czasu!");

    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> został wyciszony na ${ms(mutetime)}`);

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> odzyskał mowę!`);
    }, ms(mutetime));

// end of module
}

module.exports.help = {
    name: "tempmute"
}