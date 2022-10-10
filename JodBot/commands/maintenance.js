module.exports = {
    name: 'maintenance',
    description: 'toggle maintenance mode.',
    async execute(message,args,Discord,client){
        const channel = message.guild.channels.cache.get('797978003355074571');
        let role;
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
        }
        switch(args[0]){
            case 'on':
                localStorage.setItem('maintenance',JSON.stringify(true));
                role = message.guild.roles.cache.find(role => role.name === "🛠️ Maintenance Mode"); // Getting the role
                message.guild.members.cache.map(async member => {
                    if (!message.member.roles.cache.some(r => r.name === "🛠️ Maintenance Mode")) {
                        await member.roles.add(role);
                        console.log(`${member.user.tag} - role updated`);
                    } else {
                        console.log(`${member.user.tag} - already has roll`);
                    }
                })
                let noteContent = '';
                for (let i = 2; i < args.length; i++) {
                    noteContent = noteContent + args[i] + ' ';
                }
                message.channel.send('🛠️ Maintenance Mode enabled. All users without administrative perms will not be able to interact with the server.');
                args[1]!==undefined?(channel.send(new Discord.MessageEmbed().setDescription(`Estimated total maintenance time: **${args[1]} minutes** ${noteContent!==''?`\nAdditional info: **${noteContent}**`:''}`))):'';
            break;
            case 'off':
                localStorage.setItem('maintenance',JSON.stringify(false));
                role = message.guild.roles.cache.find(role => role.name === "🛠️ Maintenance Mode"); // Getting the role
                message.guild.members.cache.map(async member => {
                    if (message.member.roles.cache.some(r => r.name === "🛠️ Maintenance Mode")) {
                        await member.roles.remove(role);
                        console.log(`${member.user.tag} - role updated`);
                    } else {
                        console.log(`${member.user.tag} - role already removed`);
                    }
                })
                message.channel.send('🛠️ Maintenance Mode disabled.');
            break;
        }
    }
}