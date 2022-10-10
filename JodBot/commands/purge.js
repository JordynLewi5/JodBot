module.exports = {
    name: 'purge',
    description: '',
    execute(message,args,Discord,client){
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
        }
        if (args[0] >= 0) {
            message.channel.bulkDelete(parseInt(Math.min(100,parseInt(args[0])+1)));
            message.channel.send(`**${args[0]}** items deleted.`)
                .then(message => {
                    try{
                        message.delete({
                            timeout: 400
                        });
                    }catch(error) {
                        return;
                    }
                })

        } else {
            if (args[0] == 'all') {
                async function wipe() {
                    let clearRate;
                    if(args[1] !== undefined){
                        clearRate = args[1];
                    }else{
                        clearRate = 100;
                    }
                    var msg_size = clearRate;
                    while (msg_size == clearRate) {
                        try{
                            await message.channel.bulkDelete(clearRate)
                                .then(messages => msg_size = messages.size)
                                .catch(error);
                        }catch(error) {
                            return;
                        }
                    }
                }
                wipe()
                message.channel.send('**All** items deleted.')
                    .then(message => {
                        message.delete({
                            timeout: 400
                        });
                    })
            } else {
                message.reply('please enter a correct quantity. (1-100, all)');
            }
        }
    }
}