const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {
  if (!message.member.voiceChannel) return message.channel.send("Musisz być na kanale głosowym!");
  if (message.guild.me.voiceChannel) return message.channel.send("Sorry, bot już jest połączony do kanału głosowego.");
  if (!args[0]) return message.channel.send("Sorry, ale nie wpisałeś linku do filmu w komendzie.");

  let validate = await ytdl.validateURL(args[0]);
  if (!validate) return message.channel.send("Sorry, wpisałeś niedziałający link.")

  let info = await ytdl.getInfo(args[0]);
  let connection = await message.member.voiceChannel.join();
  let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly' }));

  message.channel.send(`Gram teraz: ${info.title}`);
}

module.exports.help = {
    name: "play"
}
