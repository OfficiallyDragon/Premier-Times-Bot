const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-premier-time')
		.setDescription('Asks the server if they are available to play premier.')
		.addAttachmentOption(option =>
			option.setName('premier-time')
				.setDescription('The time you want to play premier.')
				.setRequired(true),
		),

	async execute(interaction) {
		const attachment = interaction.options.getAttachment('premier-time');

		const replyEmbed = new EmbedBuilder()
			.setColor('#f19f22')
			.setTitle('Are you able to make todays premier?')
			.setFooter({ text: 'React below to answer ⬇️' })
			.setImage(attachment.url);

		const yes = new ButtonBuilder()
			.setCustomId('yes')
			.setLabel('Yes')
			.setStyle(ButtonStyle.Success)
			.setEmoji('1014561341333328002');

		const no = new ButtonBuilder()
			.setCustomId('no')
			.setLabel('No')
			.setStyle(ButtonStyle.Danger)
			.setEmoji('1014561353454850068');

		const row = new ActionRowBuilder()
			.addComponents(yes, no);

		await interaction.reply({
			embeds: [replyEmbed],
			components: [row],
		});
	},
};