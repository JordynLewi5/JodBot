const antispam = require('./antispam');
let newUsers = [];
let userTickets = [];
module.exports = (client,Discord,prefix) => {
    client.on('messageReactionAdd', async (reaction, user) => {
        // try{
        //     if(reaction.message.author.bot) return console.log('tis a bot');
        // } catch(error) {}
        if (reaction.message.guild === null) return;
        if(await antispam(client,Discord,reaction,"reaction",user,prefix)) return;
        

        if(!findObjectByKey(newUsers, 'User', user)){
            const newUser = new Object();
            newUser.rulesChecked = false;
            newUser.infoChecked = false;
            newUser.User = user;
            newUsers.push(newUser);
        }
        const { guild } = reaction.message;
        const message = reaction.message;
        const member = guild.members.cache.find(member => member.id === user.id);
        const newUserSelected = findObjectByKey(newUsers,'User',user)
        switch(message.id){
            case '791196030862491659': //new members click here
                message.reactions.resolve(reaction.emoji.name).users.remove(user);
                if(newUserSelected.rulesChecked && newUserSelected.infoChecked){
                    member.roles.add(member.guild.roles.cache.find(role => role.name === "Contestant"));
                    member.roles.remove(member.guild.roles.cache.find(role => role.name === "Unverified User"));
                }
            break;
            case '795214550793191434'://rules
                newUserSelected.rulesChecked = true;
                message.reactions.resolve(reaction.emoji.name).users.remove(user);
            break;
            case '791189686713843732'://information
                newUserSelected.infoChecked = true;
                message.reactions.resolve(reaction.emoji.name).users.remove(user);
            break;
            case '820878520527093770': //host application
                message.reactions.resolve(reaction.emoji.name).users.remove(user);
                const applicationEmbed = new Discord.MessageEmbed()
                    .setTitle("Application for the Host role!")
                    .setColor('#78A7F4')
                    .setDescription('Thank you for you interest in becoming a host for Gamenight! Click [here](https://docs.google.com/forms/d/e/1FAIpQLScYejkO-wHYRdFpN_SvGlDkp-lsyyCfLRP-PWAaMYXlHcxmsQ/viewform?usp=sf_link) to access the application.')
                    .setThumbnail('https://i.imgur.com/69cyLqt.png');
        
                user.send(applicationEmbed);
            break;
            case '824727097938542674': //suggestion
                message.reactions.resolve(reaction.emoji.name).users.remove(user);
                try{
                    if ((findObjectByKey(userTickets,'user',user).open) === true) {
                        return;
                    }
                }catch(error) {}
                let suggestionTicket = {
                    user: user,
                    open: true,
                }
                userTickets.push(suggestionTicket);
                const embed = new Discord.MessageEmbed()
                    .setTitle('Suggestion/Bug Report')
                    .setColor('#78A7F4')
                    .setDescription('In **one** message, please enter the suggestion or bug you would like to submit. Once you have done that we will be able to see your response and this text channel will be deleted. If no response is provided within **5 minutes** of this channel\'s creation, the text channel will be closed. If you wish to cancel this process, simply type **cancel**.') 
                    .setThumbnail('https://i.imgur.com/69cyLqt.png')
                    .addFields({name: '\u200B',value:'*Thanks for your interest in improving Gamenight!*'})
                message.guild.channels.create(`📘│${user.username} click here`, {
                    type: 'text',
                    parent: '777972092305276938',
                    permissionOverwrites: [{
                        id: '775222016080871424',
                        deny: ['VIEW_CHANNEL']
                    }, {
                        id: user.id,
                        allow: ['VIEW_CHANNEL']
                    }
                ]
                }).then(channel => {
                    channel.send(embed);
                    channel.awaitMessages(m => m.author.id == m.author.id, {
                        max: 2,
                        time: 300000,
                    }).then(collected => { 
                        const suggestionsChannel = message.guild.channels.cache.get('777356654291189791');
                        const lastMessageID = channel.messages.cache.get(user.lastMessageID);
                        if(lastMessageID.content.toLowerCase() == 'cancel'){
                            channel.send('**Okay, this channel will self-destruct in 5 seconds.**')
                            channel.awaitMessages(message => message.author.id == message.author.id, {
                                time: 5000
                            }).then(collected => {
                                channel.send('boom');
                                channel.delete();
                                suggestionTicket.open = false;
                        })
                            return;
                        }
                        const lastMessage = `**${member} suggested/reported:**\n + ${lastMessageID.content}`;
                        suggestionsChannel.send(lastMessage).then(lastMessage => {
                            lastMessage.react('✔️');
                            lastMessage.react('✖️');                        
                        })

                        channel.send('**Thanks for your response! This channel will self-destruct in 5 seconds.**')
                        channel.awaitMessages(message => message.author.id == message.author.id, {
                            time: 5000
                        }).then(collected => { 
                            channel.send('boom');
                            channel.delete();
                            suggestionTicket.open = false;
                        })
                    }).catch(() => {
                        channel.send('boom')
                        channel.delete();
                        suggestionTicket.open = false;
                    })
                });
                break;
            //Add notification squad
            case '824728181520334929':
                member.roles.add(member.guild.roles.cache.find(role => role.name === "Notification Squad"));
                break;
            //Vote reminders
            case '847166125464092742':
                member.roles.add(member.guild.roles.cache.find(role => role.name === "Vote Notifications"));
                break;
            case '824726359619928115': //report
                message.reactions.resolve(reaction.emoji.name).users.remove(user);
                try{
                    if ((findObjectByKey(userTickets,'user',user).open) === true) {
                        return;
                    }
                }catch(error) {}
                let reportTicket = {
                    user: user,
                    open: true,
                }
                userTickets.push(reportTicket);
                const reportEmbed = new Discord.MessageEmbed()
                    .setTitle('Report Ticket')
                    .setColor('#78A7F4')
                    .setDescription('In **one** message, please enter the \`@username\` of the user you are reporting (they will **not** receive an @mention ping), followed by the reason for reporting the user. Please provide as much detail as you believe is necessary. Once you have done that we will be able to see your response and this text channel will be deleted. If no response is provided within **5 minutes** of this channel\'s creation, the text channel will be closed. If you wish to cancel this process, simply type **cancel**.\n\n`NOTE: Abusing this function to report innocent members is an automatic 4-Strike offense without possibility of appeal. Refer to the rules for more information on the Strikes System.`') 
                    .setThumbnail('https://i.imgur.com/69cyLqt.png')
                    .addFields({name: ', ',value:'*Thanks for keeping Gamenight a safe space for all members!*'})
                message.guild.channels.create(`📘│${user.username} click here`, {
                    type: 'text',
                    parent: '777972092305276938',
                    permissionOverwrites: [{
                        id: '775222016080871424',
                        deny: ['VIEW_CHANNEL']
                    }, {
                        id: user.id,
                        allow: ['VIEW_CHANNEL']
                    }
                ]
                }).then(channel => {
                    channel.send(reportEmbed);
                    channel.awaitMessages(m => m.author.id == m.author.id, {
                        max: 2,
                        time: 300000,
                    }).then(collected => { 
                        const reportChannel = message.guild.channels.cache.get('800446148875780136');
                        const lastMessageID = channel.messages.cache.get(user.lastMessageID);
                        if(lastMessageID.content.toLowerCase() == 'cancel'){
                            channel.send('**Okay, this channel will self-destruct in 5 seconds.**')
                            channel.awaitMessages(message => message.author.id == message.author.id, {
                                time: 5000
                            }).then(collected => {
                                channel.delete();
                                reportTicket.open = false;
                        })
                            return;
                        }
                        const lastMessage = ' 💭\n **' + (`${member}`) + ' suggested/reported: **\n' + lastMessageID.content;
                        reportChannel.send(lastMessage).then(lastMessage => {
                            lastMessage.react('✔️');
                            lastMessage.react('✖️');                        
                        })

                        channel.send('**Thanks for your response! This channel will self-destruct in 5 seconds.**')
                        channel.awaitMessages(message => message.author.id == message.author.id, {
                            time: 5000
                        }).then(collected => { 
                            channel.delete();
                            reportTicket.open = false;
                        })
                    }).catch(() => {
                        channel.delete();
                        reportTicket.open = false;
                    })
                });
            break;
        }
    })
    //reaction removed
    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message.guild === null) return;

        const { guild } = reaction.message;
        const message = reaction.message;
        const member = guild.members.cache.find(member => member.id === user.id);
        switch(message.id){
            case '824728181520334929'://remove notification squad
                member.roles.remove(member.guild.roles.cache.find(role => role.name === "Notification Squad"));
            break;
            case '847166125464092742'://remove notification squad
                member.roles.remove(member.guild.roles.cache.find(role => role.name === "Vote Notifications"));
            break;
        }
    })

    //Find Object
    function findObjectByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    }
}