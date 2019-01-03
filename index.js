const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.lenght <= 0){
        console.log("Nie można znaleźć komend.");
        return;
    };

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on("ready", async () => {
    console.log(`${bot.user.username} został uruchomiony poprawnie!`);
    console.log(`${bot.user.username} znajduje się na ${bot.guilds.size} serwerach!`);
    bot.user.setActivity(`Lista komend: ${botconfig.prefix}help || Jestem na ${bot.guilds.size} serwerach! || Obsługuję ${bot.users.size} użytkowników || Pilnuję ${bot.channels.size} kanałów!`);
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: botconfig.prefix
      };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(message.content.startsWith(prefix)){
        if(commandfile) commandfile.run(bot,message,args);
    }
});

bot.login(botconfig.token);
