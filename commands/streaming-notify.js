module.exports = {
    name: 'streamnotify',
    description: 'Attaches a notification system when someone is streaming on Mixer.',
    aliases: ["sn"],
    cooldown: 2,
    execute(message, args, client) {

        if(message.author.id !== '250726130196283392') {
            message.channel.send("You don't have access to this command.");
            return;
        }

        if(args < 3) {
            message.channel.send("Too few arguments.");
            return;
        }

        var jsonid = args[0];
        var channelid = args[1];
        var username = args[2];
        var guild = message.guild;
        var channel = guild.channels.get(channelid);
        var lastUpdateTime = Date.now() + 2001;
        var doublesendflag = 0;
        const Carina = require('carina').Carina;
        const ws = require('ws');

        Carina.WebSocket = ws;

        const ca = new Carina({ isBot: true }).open();

        ca.subscribe(`channel:${jsonid}:update`, data => {
            if(Date.now() < (lastUpdateTime + 2000)) {
                doublesendflag = 1;
            } else {
                doublesendflag = 0;
            }
            console.log('Channel update', data);
            if(data.online == true && doublesendflag === 0) {
                channel.send(`${username} is currently streaming on Mixer!`);
            }
            if(data.online == false && doublesendflag === 0) {
                channel.send(`${username}'s stream has ended!`);
            }
            lastUpdateTime = Date.now();
        });

        function unNotifCallback(channelmsg) {
            if(channelmsg.content.startsWith(`^unnotifystream ${username}`)) {
                channelmessage.send(`Notifier for ${username}'s stream has been disconnected.'`);
                client.off('message', unNotifCallback)
            }
        }

        client.on('message', unNotifCallback);

    }
}
