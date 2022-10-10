module.exports = {
    name: 'apply',
    description: '',
    execute(message,args,Discord,client){
        if (!(message.member.roles.cache.find(r => r.name === "Contestant")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));
        }
        const applicationEmbed = new Discord.MessageEmbed()
            .setTitle("Apply")
            .setColor('#ffa500')
            .setDescription('Thank you for your interest in Gamenight! Click [here](https://www.gamenight.li/apply) to access the applications for the Hole role and Moderator role.')
            .setThumbnail('https://i.imgur.com/69cyLqt.png');

        message.author.send(applicationEmbed);
        
    }
}