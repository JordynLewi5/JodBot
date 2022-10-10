module.exports = {
    name: 'rules',
    description: 'provides link to rules',
    async execute(message,args,Discord,client){
        if (!(message.member.roles.cache.find(r => r.name === "Contestant")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send('You don\'t have the permissions.')
        }
        if(args[0] !== 'messageEmbedded__' && !message.member.roles.cache.find(r => r.name === "Admin")) return message.reply(new Discord.MessageEmbed().setDescription('Find rules in the <#775226903442620417> channel.'));
        await message.delete();
        
        let date = new Date().toLocaleDateString()
        
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('𝙎𝙚𝙧𝙫𝙚𝙧 𝙍𝙪𝙡𝙚𝙨')
        .setDescription(`**General Rules**
        \` 1 \` Treat all members with respect.
        \` 2 \` Use an appropriate name and avatar.
        \` 3 \` No self-promotion or advertisements.
        \` 4 \` Don't share any personal information. Protect your privacy and the privacy of others.
        \` 5 \` No harassment, abuse, or bullying.
        \` 6 \` Avoid **excessive** profanity.
        \` 7 \` [Discord Terms of Service](https://discord.com/terms) and [Community Guidelines](https://discord.com/guidelines) apply. __You must be at least 13 years old to use Discord, and abide by all other terms and guidelines.__
         
        **Public Chat Rules**
        \` 1 \` No spamming messages, commands, or reactions, especially those attached to tickets like the suggestions ticket, for example. 
        \` 2 \` __All general rules apply.__
         
        **Public Voice Channel Rules**
        \` 1 \` No bullying others.
        \` 2 \` Be friendly.
        \` 3 \` No excessively obnoxious behavior. Read the room.
        \` 4 \` __All general rules apply.__
         
        **Private Chat/Voice Channel Rules**
        \` 1 \` No bullying others.
        \` 2 \` Be friendly.
        \` 3 \` __All general rules apply.__
         
        **Strikes**
        Depending on the severity of an offense you may receive a number of strikes between 1 and 4.
        **1** Strike - warning
        **2** Strikes - temp ban/server mute for appropriate duration designation by server mods.
        **3** Strikes - temp ban/ban with possibility of appeal.
        **4** Strikes - ban without possibility of appeal.
        The section above is a general overview of our Strike System. Check out the [Strike System](https://bit.ly/3omeBWk) for more details.
         
        Rules last updated: ${date}`)
        .setThumbnail('https://i.imgur.com/69cyLqt.png')
        .setFooter(`Rules are not absolute, behavior that violates the spirit of these rules is subject to the same effect.`))
        .then(message => message.react('👍'));
    }
}