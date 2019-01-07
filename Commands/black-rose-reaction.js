module.exports = {
    name: 'blackrosereaction',
    description: 'Ryn, youre gonna have to explain this one lol',
    cooldown: 2,
    execute(message, args) 
    {
        if (message.author.id === '250726130196283392') {
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

    },
};