const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['h', 'ajuda', 'cmd'],
  description: 'Lista os comandos do bot',
  execute: (message) => {
    let commands = message.client.commands.array();

    let embed = new MessageEmbed()
      .setTitle('Poring Help')
      .setDescription('Lista de comandos')
      .setColor('#F7B0BD');

    commands.forEach((cmd) => {
      embed.addField(
        `**${message.client.prefix}${cmd.name} ${
          cmd.aliases ? `(${cmd.aliases})` : ''
        }**`,
        `${cmd.description}`,
        true
      );
    });

    embed.setTimestamp();

    return message.channel.send(embed).catch(console.error);
  },
};
