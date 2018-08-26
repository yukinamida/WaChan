module.exports = {
	name: 'kick',
	description: 'Kicks the specified member',
	execute(message) {
		if (!message.guild) return;

		const user = message.mentions.users.first();

		message.member.kick().then(() => {

			message.reply(`Successfully kicked ${user.tag}`);

		}).catch(err => {

			message.reply('I was unable to kick the member');

			console.error(err);
		});

	},
};