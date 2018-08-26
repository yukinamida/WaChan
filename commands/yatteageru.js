module.exports = {
	name : 'yatteageru',
	description : 'YATTE AGERU',
	execute(message) {
		message.member.voiceChannel.join().then(connection => {
			const { voiceChannel } = message.member;

			if (!voiceChannel) {
				return message.reply('please join a voice channel first!');
			}

			console.log('joined channel');
			const dispatcher = connection.playFile('./audio/yatteageru.mp3');
			dispatcher.on('end', () => voiceChannel.leave());
		});
	} };