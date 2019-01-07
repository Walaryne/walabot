module.exports = {
    name: 'whois',
    description: 'gets info on a specified user',
    aliases: ["user", "userinfo"],
    cooldown: 2,
    execute(message, args) 
    {
        const Discord = require('discord.js');
        const client = new Discord.Client();

        client.fetchUser(message.content.slice(7), false).then(function(user) 
        {
            message.channel.send(user.username);
            message.channel.send('Joined: ' + user.createdAt);
            message.channel.send(user.avatarURL);
            message.channel.send('Uptime: ' + user.client.uptime);
        })
    },
};