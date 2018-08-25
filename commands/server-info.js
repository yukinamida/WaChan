module.exports = {
	name: 'server-info',
	description: 'Displays info about the current server.',
	execute(message) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};