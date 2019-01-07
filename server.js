const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();
//const prefix = require('./config.json').prefix; // Declares constant variable with prefix as value

//NOTE: Keep the above statement commented out UNTIL the file contains valid JSON

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready!');
    client.user.setGame('with itself');
});

// Create an event listener for messages
client.on('message', message =>
{
//    if (!message.content.startsWith(prefix) || message.author.bot) return; // Disregards message if it does not begin with the command prefix and that the user is not a bot

//    const msgArgs = message.content.slice(prefix.length).split(/ +/);// argumentss becomes an array containing every word after the initial command
//    const commandName = msgArgs.shift().toLowerCase() // The initial command has the prefix removed and is shifted to lower case, and is assigned to commandName

    try {
        // If the message is "ping"
        if (message.content === 'ping') {
            // Send "pong" to the same channel
            message.channel.send('pong');
        }
        if (message.content.startsWith('%eval') && message.author.id === '250726130196283392') {
            message.channel.send(eval(message.content.slice(5)) + '  < EVALUATED JAVASCRIPT');
        }
        if (message.content.startsWith('peternortonisgod')) {
            var richtext = new Discord.RichEmbed()
                .setImage('http://www.technologizer.com/wp-content/uploads/2014/06/image5.jpg')
                .addField('Hallo', 'i am ur god, here iz https://hentaihaven.org/', true)
                .setURL('https://www.hentaihaven.org');
            message.channel.send(richtext);
        }
        if (message.content === 'All the other kids...') {
            message.channel.send('with the pumped up kicks...')
        }
        if (message.content === 'ya better run, better run...') {
            message.channel.send('https://www.youtube.com/watch?v=rnO-MflYxCw');
        }
        if (message.content === 'I need some yandere chicks to look at me creepily whilst listening to good music') {
            message.channel.send('https://www.youtube.com/watch?v=uuBETyA_yxc');
        }
        if (message.content === 'noot noot') {
            message.channel.send('https://www.youtube.com/watch?v=a4VvRWTD3Ok');
        }
        if (message.content === "Who's your daddy Walabot?") {
            message.channel.send(':heart_eyes: Walaryne is my daddy.');
        }
        if (message.content === 'You reposted in the wrong neighborhood') {
            message.channel.send('https://www.youtube.com/watch?v=4feUSTS21-8');
        }
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
            var collector;
            var parse = message.content.split(' ');
            var filter = (reaction, _) => reaction.emoji.id === '526279145739517953';
            console.log(`Command fired, ${guild}`);
            if(parse[1] === "refresh") {
                var msgObj = guild.channels.get(parse[2])
                .fetchMessage(parse[3]);
                collector = msgObj.createReactionCollector(filter);
            } else {
                collector = message.createReactionCollector(filter);
            }
            collector.on('collect', function(r) {
                console.log("Collected Reaction");
                guild.member(r.users.last()).addRole('526274349687111690');
            });
        }
    } catch (err) {
        console.log(err);
    }
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
