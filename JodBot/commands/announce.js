module.exports = {
    name: 'announce',
    description: 'make announcements.',
    execute(message,args,Discord,client){
        if (!(message.member.roles.cache.find(r => r.name === "Host")||message.member.roles.cache.find(r => r.name === "Bots")||message.member.roles.cache.find(r => r.name === "Admin"))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
        }
        let jodBotMessage = '';
        for (let i = 0; i < args.length; i++) {
            jodBotMessage = jodBotMessage + args[i] + ' ';
        }
        message.guild.channels.cache.get('776251670656974868').send(jodBotMessage + '\n**[<@&791191121358225449>]**');

    }
}