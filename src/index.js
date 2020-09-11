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

const botCommands = require('./commands');

Object.keys(botCommands).map((key) => {
  client.commands.set(botCommands[key].name, botCommands[key]);
});

client.on('message', (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.split(/ +/);
  const commandName = args.shift().replace(prefix, '').toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(process.env.TOKEN);
