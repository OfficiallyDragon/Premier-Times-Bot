/* eslint-disable brace-style */
const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');
const mapImages = config.mapImages;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send-results')
		.setDescription('Sets up the results channel for the server.')
		.addBooleanOption(option =>
			option.setName('win')
				.setDescription('did you win?')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('corrode')
				.setDescription('Did you play Corrode?')
				.setRequired(false),
		)
		.addStringOption(option =>
			option.setName('current-points')
				.setDescription('how many points do you have after the win or lose?')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('map')
				.setDescription('What map did you play?')
				.setRequired(true)
				.addChoices(
					{ name: 'Abyss', value: 'Abyss' },
					{ name: 'Ascent', value: 'Ascent' },
					{ name: 'Bind', value: 'Bind' },
					{ name: 'Breeze', value: 'Breeze' },
					{ name: 'Corrode', value: 'Corrode' },
					{ name: 'Fracture', value: 'Fracture' },
					{ name: 'Haven', value: 'Haven' },
					{ name: 'Icebox', value: 'Icebox' },
					{ name: 'Lotus', value: 'Lotus' },
					{ name: 'Pearl', value: 'Pearl' },
					{ name: 'Split', value: 'Split' },
					{ name: 'Sunset', value: 'Sunset' },
				),
		)
		.addStringOption(option =>
			option.setName('score')
				.setDescription('How much did you win/lose by?')
				.setRequired(true),
		),
	async execute(interaction) {

		const winEmbed = new EmbedBuilder()
			.setColor('#5ef281')
			.setTitle('We won a premier match!')
			.setDescription(`And now have **${interaction.options.getString('current-points')}/600** points to qualify for playoffs
			
			Score: ${interaction.options.getString('score')}

			On the map **${interaction.options.getString('map')}**`);

		const loseEmbed = new EmbedBuilder()
			.setColor('#c53425')
			.setTitle('We lost a premier match :(')
			.setDescription(`And now have **${interaction.options.getString('current-points')}/600** points to qualify for playoffs

			Score: ${interaction.options.getString('score')}
			
			On the map **${interaction.options.getString('map')}**`);

		const selectedMap = interaction.options.getString('map');
		const mapImage = mapImages[selectedMap];

		if (mapImage) {
			winEmbed.setImage(mapImage);
			loseEmbed.setImage(mapImage);
		}

		await interaction.reply({ content: 'Results sent successfully!', flags: MessageFlags.Ephemeral });
		if (interaction.options.getBoolean('win')) {
			await interaction.channel.send({ embeds: [winEmbed] });
		} else {
			await interaction.channel.send({ embeds: [loseEmbed] });
		}
	},
};