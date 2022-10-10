module.exports = {
    name: 'react',
    description: 'add or remove reactions from a specified message using its message ID.',
    async execute(message,args,Discord,client,prefix){
        const channel = message.channel;
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));
        }
        try{
            let _message = message;
            await message.delete();
            message = await message.channel.messages.fetch(args[0]);
            args.shift();
            await args.map(async emoji => {
                try {
                    await message.react(emoji);
                } catch(error) {}
            })
        }catch(error){
           message.channel.send(` \`\`\`${prefix}react [message ID] [emoji]\`\`\``);
        }

    }
} 