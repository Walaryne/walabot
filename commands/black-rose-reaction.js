module.exports = {
    name: 'blackrosereaction',
    description: 'Ryn, youre gonna have to explain this one lol',
    cooldown: 2,
    execute(message, args, _) {
        if (message.author.id === '250726130196283392') {
            var guild = message.guild;
            var filter = (reaction, _) => reaction.emoji.id === '526279145739517953';
            console.log(`Command fired, ${guild}`);
            if (args[0] === "refresh") {
                guild.channels.get(args[1])
                    .fetchMessage(args[2]).then(function(msgObj) {
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
