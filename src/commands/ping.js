module.exports = {
  name: 'ping',
  aliases: ['p'],
  description: 'Testa a latência do servidor',
  execute: (message) => {
    message.channel.send('pong');
  },
};
