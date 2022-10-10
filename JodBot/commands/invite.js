module.exports = {
    name: 'invite',
    description: 'Provides an invite link to the welcome channel.',
    execute(message,args,Discord,client){
        if (!(message.member.roles.cache.find(r => r.name === "Contestant")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
        }
        message.reply('Invite link: https://discord.gg/UgVurQUsGD');
    }
}