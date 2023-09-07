const {SlashCommand, randint} = require("../base.js");
const {open_bank, update_bank} = require("../modules/bank_funcs.js");

const {EmbedBuilder, userMention} = require("discord.js");

const work = new SlashCommand()
    .setName("work")
    .setDescription("work")
    .setDMPermission(false)
    .setCooldown(2 * 3600);
work.callback(async (interaction) => {
    await interaction.deferReply();
    const user = interaction.user;
    await open_bank(user);

    let rand_amt = randint(20, 100);
    await update_bank(user, +rand_amt);
    await interaction.followUp(
        `${userMention(user.id)} you worked for ${rand_amt}€`
    );
});

module.exports = {
    setup: () => {
        console.log(`- ${__filename.slice(__dirname.length + 1)}`);
    },
};
