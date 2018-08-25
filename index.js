// ===== Imports =====

const config = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');

// ===== Function =====

// Create a new discord client
const WaChan = new Discord.Client();

// Create a new command collection
WaChan.commands = new Discord.Collection();

// Creates array of command files within the related folder (commands have to be in .js format)
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // eslint-disable-line no-unused-vars

// Loop through the previously created array
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	WaChan.commands.set(command.name, command);
}

// ===== Console =====

// Runs on bot login/reconnect
WaChan.on('ready', () => {
	console.log(`${WaChan.user.tag} has started successfully!`);
	WaChan.user.setActivity('with discord.js');
});

// ===== Message Handling =====

// Runs whenever a new message is send
WaChan.on('message', message => {

	// If no prefix is specified exit
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	// Split the provided message into arguments and shift them to lower case
	const args = message.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Gets the corresponding command if it exists
	const command = WaChan.commands.get(commandName)
        || WaChan.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// If the command doesn't exist exit
	if (!command) return;

	// Check if arguments have been provided
	if (command.args && !args.length) {
		const reply = `No arguments have been provided, ${message.author}!`;

		return message.channel.send(reply);
	}

	// Execute the specified command
	try {
		command.execute(message, args);
	}
	// Basic error handling
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

// ===== OnGuildMemberAdd =====

WaChan.on('guildMemberAdd', member => {
	// Send the message to a specific channel on the server:
	const channel = member.guild.channels.find(ch => ch.name === 'general');
	// Do nothing if the channel wasn't found
	if (!channel) return;
	// Send the message, mentioning the new member
	channel.send(`Welcome to the server, ${member}`);
});


WaChan.login(config.token);