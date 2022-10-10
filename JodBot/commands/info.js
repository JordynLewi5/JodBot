module.exports = {
    name: 'info',
    description: 'Provides link to information channel.',
    async execute(message,args,Discord,client){
        if (!(message.member.roles.cache.find(r => r.name === "Contestant")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
        }
        if(args[0] !== 'messageEmbedded__') return message.reply(new Discord.MessageEmbed().setDescription('Find info in the <#775231917997293568> channel.'));
        await message.delete();

        let date = new Date().toLocaleDateString()

        message.channel.send(new Discord.MessageEmbed()
        .setTitle('𝙎𝙚𝙧𝙫𝙚𝙧 𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙩𝙞𝙤𝙣')
        .setDescription(`__**General Information**__

        \▶️ **What is Gamenight?**
        
        **Gamenight** was started as a fun way to connect with other people during the difficult times of the Covid-19 pandemic. It was a weekly event where we played party games or watched TV shows and movies. Now we decided to turn it into a server and put a nice bow on it.
        
        \▶️ **What can you do here?**
        
        You may have noticed that there aren't too many channels here on the server. This is by design. If you scroll down to <#789239937429798952> you'll find a channel that you can join. Joining this channel will automatically create your own **private** party with loads of commands to help you configure the party to your liking. If you're ever confused about something, all of the information you'll need can be found in <#789239937429798952>. 
        
        We also have weekly Gamenight events planned for those that just want to hang out.
        
        On top of the dozens of custom commands, we also have our own music bot system called Jukebot, which all use the same prefix "-".
        
        __**Important channels:**__
        <#776251670656974868> ~ Announcements for upcoming events and changes to the server will be made here.
        <#775226903442620417> ~ Our server rules. Rules may be updated periodically.
        <#775231917997293568> ~ Information about our server can be found here.
        <#784650629556731904> - Create any suggestions you have for the server or report and bugs you come across. This is very helpful for us to improve the server!
        <#789239937429798952> - Find information on how to create and customize your own parties that your friends or anyone can join.

        __**Commands**__
        To find a command you are looking for simply use \`-help\`.
        
        **Vist our [website](https://www.gamenight.li)!**

        Information last updated: ${date}`)
        .setThumbnail('https://i.imgur.com/69cyLqt.png'))
        .then(message => message.react('👍'));
    }
}