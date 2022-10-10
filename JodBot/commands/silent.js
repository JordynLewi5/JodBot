module.exports = {
    name: 'silent',
    description: 'make announcements.',
    execute(message,args,Discord,client){
        if (!(message.member.roles.cache.find(r => r.name === "Bots")||message.member.roles.cache.find(r => r.name === "Admin"))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
        }
        message.delete();

    }
}