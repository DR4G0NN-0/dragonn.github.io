const fs = require('fs');
const Discord = require('discord.js');
const { prefix, Token } = require('../config.json');


const { Client, GatewayIntentBits } = require('discord.js')

const client = new Client({
    intents: [//GatewayIntentBits.AllIntents
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildBans,
//GatewayIntentBits.GuildEmojisAndStickers,
//GatewayIntentBits.GuildIntegrations,
//GatewayIntentBits.GuildWebhooks,
//GatewayIntentBits.GuildInvites,
//GatewayIntentBits.GuildPresences,
//GatewayIntentBits.GuildMessageReactions,
//GatewayIntentBits.GuildMessageContent,
//GatewayIntentBits.GuildMessageAttachments,
//GatewayIntentBits.GUILD_MESSAGE_PIN


/*GUILDS
GUILD_MEMBERS
GUILD_BANS
GUILD_EMOJIS_AND_STICKERS
GUILD_INTEGRATIONS
GUILD_WEBHOOKS
GUILD_INVITES
GUILD_VOICE_STATES
GUILD_PRESENCES
GUILD_MESSAGES
GUILD_MESSAGE_REACTIONS
GUILD_MESSAGE_TYPING
DIRECT_MESSAGES
DIRECT_MESSAGE_REACTIONS
DIRECT_MESSAGE_TYPING
GUILD_MESSAGE_CONTENT
GUILD_MESSAGE_ATTACHMENTS
GUILD_MESSAGE_PIN*/
        // ...
    ]
})

//const client = new Discord.Client({ intents: ['GUILD_MESSAGES', 'GUILDS'] });
client.commands = new Discord.Collection();

const commandFiles0 = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
const commandFiles1 = fs.readdirSync('./Commands/Utilities_Cmds').filter(file => file.endsWith('.js'));
const commandFiles2 = fs.readdirSync('./Commands/General_Cmds').filter(file => file.endsWith('.js'));
const commandFiles3 = fs.readdirSync('./Commands/Moderation_Cmds').filter(file => file.endsWith('.js'));
const commandFiles4 = fs.readdirSync('./Commands/Currency_Cmds').filter(file => file.endsWith('.js'));
const commandFiles5 = fs.readdirSync('./Commands/Fun_Cmds').filter(file => file.endsWith('.js'));
const commandFiles6 = fs.readdirSync('./nsfw').filter(file => file.endsWith('.js'));

for (const file of commandFiles0) {
    const command0 = require(`../Commands/${file}`);
    client.commands.set(command0.name, command0);
    console.log(command0, command0.name);
}

for (const file of commandFiles1) {
    const command1 = require(`./Commands/Utilities_Cmds/${file}`);
    client.commands.set(command1.name, command1);
    console.log(command1, command1.name);
    let cmd1 = command1.name;
}

for (const file of commandFiles2) {
    const command2 = require(`./Commands/General_Cmds/${file}`);
    client.commands.set(command2.name, command2);
    console.log(command2, command2.name);
}

for (const file of commandFiles3) {
    const command3 = require(`./Commands/Moderation_Cmds/${file}`);
    client.commands.set(command3.name, command3);
    console.log(command3, command3.name);
}

/*for (const file of commandFiles4) {
    const command4 = require(`../Commands/Currency_Cmds/${file}`);
    client.commands.set(command4.name, command4);
    console.log(command4, command4.name);
}

for (const file of commandFiles5) {
    const command5 = require(`./Commands/Fun_Cmds/${file}`);
    client.commands.set(command5.name, command5);
    console.log(command5, command5.name);
}

for (const file of commandFiles6) {
    const command6 = require(`./nsfw/${file}`);
    client.commands.set(command6.name, command6);
    console.log(command6, command6.name);
}*/

//const Tags = require('../resources/DudeTag');
//const xpdb = require('../Database/newDb.js');

client.once('ready', () => {
    console.log('ready');
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (message.content === '!ping') {
        message.channel.send('pong');
    } 
/*	else if (message.content.startsWith('!del')) {
        const amount = parseInt(args[0]);
        console.log(amount);
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`**${message.author.username}, Sorry but you need \`MANAGE_MESSAGES\` Permission to use this command.**`).then(m => m.delete({ timeout: 7000 }));

        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`**${message.author.username}, Uh i want do this but i need following permission to \`purge\` to work: \`MANAGE_MESSAGES\`**`).then(x => x.delete({ timeout: 7000 }));

        if (isNaN(args[0])) return message.channel.send(`**${message.author.username}, Please supply a valid amount of messages to purge**!`);

        else if (amount < 2 || amount > 100) return message.channel.send(`**${message.author.username}, Please supply a number less than 100**!`).then(u => u.delete({ timeout: 7000 }));

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel!');
        });
    }
*/
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(Token);





















/*const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { prefix, Token } = require('../config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const commandFolders = fs.readdirSync('./Commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../Commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        console.log(command.name);
    }
}

const Tags = require('../resources/DudeTag');
const xpdb = require('../Database/newDb.js');

client.once('ready', () => {
    console.log('Ready');
    // t(Tags.sync());
    // console.log('Tags Synced');
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === 'ping') {
        message.channel.send('Pong');
    }
    
    // ... (other commands)

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

client.login(Token);*/
