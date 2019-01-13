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

        if(args < 3) {
            message.channel.send("Too few arguments.");
            return;
        }

        var jsonid = args[0];
        var channelid = args[1];
        var username = args[2];
        var guild = message.guild;
        var channel = guild.channels.get(channelid);
        var timeval;
        var doublesendflag = 0;
        const Carina = require('carina').Carina;
        const ws = require('ws');

        Carina.WebSocket = ws;

        const ca = new Carina({ isBot: true }).open();

        ca.subscribe(`channel:${jsonid}:update`, data => {
            timeval = Date.now();
            if(Date.now() < (timeval + 2000)) {
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
        });

    }
}
