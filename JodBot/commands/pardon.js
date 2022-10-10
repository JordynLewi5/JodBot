const time = new Date();
module.exports = {
    name: 'pardon',
    description: 'Pardon a users ban or softban.',
    execute(message,args,Discord,client,prefix,authorID){
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send('You don\'t have the permissions.');
        }
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots")||message.member.roles.cache.find(r => r.name === "Mods"))) {
            return message.channel.send('You don\'t have the permissions to mute that person.');
        }
        const { guild } = message;
        const author = guild.members.cache.find(member => member.id === authorID)
        const member = guild.members.cache.find(member => member.id === args[0].slice(3,-1));
        let reason = '';
        for (let i = 1; i < args.length; i++) {
            reason += args[i] + ' ';
        }        

        const staffChannel = message.guild.channels.cache.get('790108809905438721');
        //configure user roles
        member.roles.add(member.guild.roles.cache.find(role => role.name === "Contestant"));
        member.roles.remove(member.guild.roles.cache.find(role => role.name === "Muted"));
        //create staff message
        const staffMessage = new Discord.MessageEmbed()
        .setColor('#ffca20')
        .setTitle('Gamenight Moderation')
        .setDescription(`${member} has been pardoned ${author}.`)
        staffChannel.send(staffMessage)
        //create user message
        const userMessage = new Discord.MessageEmbed()
        .setColor('#ffca20')
        .setTitle('Gamenight Moderation')
        .setDescription(`You were pardoned by ${author}.\nReason: ${reason!==''?reason:'Reason not specified.'}`)
        member.send(userMessage);
        message.delete();
    }
}