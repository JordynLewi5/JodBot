module.exports = {
    name: 'guildmemberadd',
    description: 'placeholder to prevent errors',
    async execute(message,args,Discord,client,prefix){
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
        }
        const guild = message.guild;
        if (args[0] !== 'allUsers') {
            const member = message.guild.members.cache.get(args[0].includes('!')?args[0].slice(3,-1):args[0].slice(2,-1));
            console.log('member added:', member.user.tag)
            await client.emit("guildMemberAdd", member);
        } else {
            guild.members.fetch().then(members => {
                members.forEach(async member => {
                    console.log('member added:', member.user.tag)
                    await client.emit("guildMemberAdd", member);
                });
            })
        }
    }
}