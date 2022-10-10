const time = new Date();
module.exports = {
    name: 'softban',
    description: 'Users added to the softBan role cannot talk in vc, type in text channels, or react to messages for a specified duration of time.',
    execute(message,args,Discord,client,prefix,authorID){
        const { guild } = message;
        const author = guild.members.cache.find(member => member.id === authorID)
        const id = args[0].includes('!')?args[0].slice(3,-1):args[0].slice(2,-1);
        const member = guild.members.cache.find(member => member.id === id);
        console.log(id)
        //console.log(args[0].slice(3,-1))
        let reason = '';
        for (let i = 2; i < args.length; i++) {
            reason += args[i] + ' ';
        }
        
        //console.log(member);
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send('You don\'t have the permissions.');
        }
        //console.log(member);
        //console.log(member);
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots")||message.member.roles.cache.find(r => r.name === "Mods"))) {
            return message.channel.send('You don\'t have the permissions to mute that person.');
        }
        const staffChannel = message.guild.channels.cache.get('790108809905438721');
        member.roles.add(member.guild.roles.cache.find(role => role.name === "Muted"));
        member.roles.remove(member.guild.roles.cache.find(role => role.name === "Contestant"));
        const staffMessage = new Discord.MessageEmbed()
        .setColor('#ffca20')
        .setTitle('Gamenight Moderation')
        .setDescription(`${member} has been softbanned for ` + args[1] + ` minute(s) by ${author}.`)
        staffChannel.send(staffMessage)
        const userMessage = new Discord.MessageEmbed()
        .setColor('#ffca20')
        .setTitle('Gamenight Moderation')
        .setDescription(`You\'ve been muted from all activities for ${args[1]} minute(s).\nReason: ${reason!==''?reason:'Reason not specified.'}`)
        member.send(userMessage);
        setTimeout(() => {  
            member.roles.add(member.guild.roles.cache.find(role => role.name === "Contestant"));
            member.roles.remove(member.guild.roles.cache.find(role => role.name === "Muted"));    
        }, parseInt(args[1])*60000);
        message.delete();
    }
}