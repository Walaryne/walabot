module.exports = {
    name: 'streamnotify',
    description: 'Attaches a notification system when someone is streaming on Mixer.',
    aliases: ["sn"],
    cooldown: 2,
    execute(message, args, _) {

        if(message.author.id !== '250726130196283392') {
            message.channel.send("You don't have access to this command.");
            return;
        }

        var jsonid = args[0];
        var channelid = args[1];
        var guild = message.guild;
        var channel = guild.channels.get(channelid);
        const Carina = require('carina').Carina;
        const ws = require('ws');

        Carina.WebSocket = ws;

        const ca = new Carina({ isBot: true }).open();

        ca.subscribe(`channel:${jsonid}:update`, data => {
            console.log('Channel update', data);
        });

    }
}
