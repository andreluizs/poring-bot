const run = (client, msg) => {
  msg.channel.send('pong');
};

module.exports = {
  name: 'ping',
  aliases: ['p'],
  description: 'Ping!',
  run,
};
