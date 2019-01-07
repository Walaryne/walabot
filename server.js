const Discord = require('discord.js');
const fs = require('fs'); // Imports fs, NodeJS File System - required for dynamic reading

// Create an instance of a Discord client
const client = new Discord.Client();
const cooldowns = new Discord.Collection();
const prefix = require('./config.json').prefix; // Declares constant variable with prefix as value

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready!');
    client.user.setGame('with itself'); // Would advise swapping to setActivity to avoid redundancy  --Ben
    //Planning on fixing this Ben, it's a deprecated function btw, not a redundancy.
});

client.commands = new Discord.Collection(); // Creates an instance of the Command collection from discord.js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // takes every .js file from the folder and loads it into an array

for (const file of commandFiles) { // Runs through the aforementioned array and imports all of the files as modules.
    const command = require(`./commands/${file}`); // assigns file x to command
    client.commands.set(command.name, command); // assigns command module to the discord command set
}

// Create an event listener for messages
client.on('message', message => {
    //#region multi-word-commands
    switch (message.content) {
        case 'All the other kids...':
            message.channel.send('with the pumped up kicks...');
            break;
        case 'ya better run, better run...':
            message.channel.send('https://www.youtube.com/watch?v=rnO-MflYxCw');
            break;
        case 'I need some yandere chicks to look at me creepily whilst listening to good music':
            message.channel.send('https://www.youtube.com/watch?v=uuBETyA_yxc');
            break;
        case 'noot noot':
            message.channel.send('https://www.youtube.com/watch?v=a4VvRWTD3Ok');
            break;
        case "Who's your daddy Walabot?":
            message.channel.send('😍 Walaryne is my daddy.'); // swapped to unicode emoji; will still render as discord one
            break;
        case 'You reposted in the wrong neighborhood':
            message.channel.send('https://www.youtube.com/watch?v=4feUSTS21-8');
            break;

    }
    //#endregion

    //#region parser+command-handler
    if (!message.content.startsWith(prefix) || message.author.bot) return; // Disregards message if it does not begin with the command prefix and that the user is not a bot


    const msgArgs = message.content.slice(prefix.length).split(/ +/); // argumentss becomes an array containing every word after the initial command
    const commandName = msgArgs.shift().toLowerCase() // The initial command has the prefix removed and is shifted to lower case, and is assigned to commandName

    if (!client.commands.has(commandName) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))) { // Checks to see if the command exists / alias exists
        message.reply(`🤔 I-I'm not sure what ${command} means ;-;`);
        return;
    }

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // retrieves actual command from module
    if (!command) return; // Uses psuedotruth to return on null value

    if (!cooldowns.has(command.name)) { // Checks to see if the command is on cooldown
        cooldowns.set(command.name, new Discord.Collection()); // Adds the command to the cooldowns object
    }

    const now = Date.now(); // gets current time to initiate the cooldown
    // Taken from the discord documentation, I don't follow but my tests indicate it works
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`AAAAAAAAAAA! Too fast! Give me ${timeLeft.toFixed(1)} seconds before running \`${command.name}\` again!.`);
        }

    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, client); // actually executes the command
    } catch (error) {
        console.error(error);
        message.reply(`Uwaaa! I think I dropped something...`);
    }
    //#endregion

    //#region RedundantCode
    /*try {             // ALL OF THIS CODE IS REDUNDANT BUT KEPT UNTIL MY OWN IS PROVEN TO BE ROBUST

        if (message.content.startsWith('%whois')) {
            client.fetchUser(message.content.slice(7), false).then(function(user) {
                message.channel.send(user.username);
                message.channel.send('Joined: ' + user.createdAt);
                message.channel.send(user.avatarURL);
                message.channel.send('Uptime: ' + user.client.uptime);
            });
        }
        if (message.content.startsWith('%blackrosereaction') &&
            message.author.id === '250726130196283392') {

            var guild = message.guild;
            var parse = message.content.split(' ');
            var filter = (reaction, _) => reaction.emoji.id === '526279145739517953';
            console.log(`Command fired, ${guild}`);
            if(parse[1] === "refresh") {
                guild.channels.get(parse[2])
                .fetchMessage(parse[3]).then(function(msgObj) {
                    var collector = msgObj.createReactionCollector(filter);
                    collector.on('collect', function(r) {
                        console.log("Collected Reaction");
                        guild.member(r.users.last()).addRole('526274349687111690');
                    });
                    console.log(`Sucessfully attached to message ${parse[3]} in channel ${parse[2]}`);
                    message.channel.send(`Sucessfully attached to message ${parse[3]} in channel ${parse[2]}`);
                });
            } else {
                var collector = message.createReactionCollector(filter);
                collector.on('collect', function(r) {
                    console.log("Collected Reaction");
                    guild.member(r.users.last()).addRole('526274349687111690');
                });
            }
        }
    } catch (err) {
        console.log(err);
    }*/
    //#endregion
});

client.on('guildCreate', guild => {
    try {
        if (guild.id !== '525918625308344330') {
            guild.leave();
            console.log('Left guild ' + guild);
        }
    } catch (err) {
        console.log(err);
    }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.SECRET);

var express = require('express');
var app = express();
app.get("/", (_, response) => {
    response.sendStatus(200);
});
app.listen(process.env.PORT);
