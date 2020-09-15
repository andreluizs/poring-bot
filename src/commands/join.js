module.exports = {
  name: 'join',
  aliases: ['j'],
  description: 'Join Channel!',
  execute: (message) => {
    const { channel } = message.member.voice;
    if (!channel) return message.reply('Você não está em um canal de audio');

    channel.join();
  },
};
