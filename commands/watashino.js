module.exports = {
	name : 'watashino',
	description : '私の名前はワルサーWA２０００。指揮官、私の足を引っ張ったら承知しないわよ。',
	execute(message) {
		message.member.voiceChannel.join().then(connection => {
			const { voiceChannel } = message.member;

			if (!voiceChannel) {
				return message.reply('please join a voice channel first!');
			}

			console.log('joined channel');
			const dispatcher = connection.playFile('./audio/watashino.mp3');
			dispatcher.on('end', () => voiceChannel.leave());
		});
	} };