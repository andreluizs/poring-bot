module.exports = {
  name: 'ping',
  aliases: ['p'],
  description: 'Ping!',
  execute(msg) {
    msg.channel.send('pong');
  },
};
