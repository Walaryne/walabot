/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
  client.user.setGame('with itself');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
  }
  if (message.content.startsWith('eval') && message.author.id === '250726130196283392') {
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
  if (message.content === 'up up down down left right left right b a start') {
    message.channel.send('https://www.youtube.com/watch?v=L3LaKy1fsw8');
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
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.SECRET);
