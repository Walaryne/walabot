module.exports = {
    name: 'blackrosereaction',
    description: 'Ryn, youre gonna have to explain this one lol',
    cooldown: 2,
    execute(message, args, _, _) {
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
                        console.log(`Successfully attached to message ${args[2]} in channel ${args[1]}`);
                        message.channel.send(`Successfully attached to message ${args[2]} in channel ${args[1]}`);
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
