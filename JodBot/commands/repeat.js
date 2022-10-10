module.exports = {
    name: 'repeat',
    description: '',
    execute(message,args,Discord,client){
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send('You don\'t have the permissions.')
        }
        try{
        let jodBotMessage = '';
            message.channel.bulkDelete(1);
            if (args[0] > 0) {
                for (let i = 1; i < args.length; i++) {
                    jodBotMessage = jodBotMessage + args[i] + ' ';
                }
                for (let i = 0; i < args[0]; i++) {
                    message.channel.send(jodBotMessage);
                }
            } else {
                for (let i = 0; i < args.length; i++) {
                    jodBotMessage = jodBotMessage + args[i] + ' ';
                }
                message.channel.send(jodBotMessage);
            }
        }catch(error){
            message.channel.send(` \`\`\`${prefix}repeat [#, or blank for 1] [message]\`\`\``);
        }
    }
}