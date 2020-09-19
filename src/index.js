require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Bot Online!'));

app.listen(port, () =>
  console.log(`Bot rodando no endereço: http://localhost:${port}`)
);

// ================= START BOT CODE ===================
const { Client, Collection } = require('discord.js');

const client = new Client();
client.commands = new Collection();
const prefix = process.env.PREFIX;
client.prefix = prefix;

const botCommands = require('./commands');

Object.keys(botCommands).map((key) => {
  client.commands.set(botCommands[key].name, botCommands[key]);
});

client.on('ready', () => {
  client.user.setActivity('!help');
});

client.on('message', (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply(
      'Ocorreu um erro ao executar o comando, entre em contato com algum administrador.'
    );
  }
});

client.on('guildMemberAdd', () => {});
client.on('guildMemberRemove', () => {});

client.login(process.env.TOKEN);
