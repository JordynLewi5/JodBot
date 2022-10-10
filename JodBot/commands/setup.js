const { CategoryChannel, ReactionCollector } = require("discord.js");
module.exports = {
    name: 'setup',
    description: '',
    execute(message,args,Discord,client,prefix) {
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            message.channel.send('You don\'t have the permissions.')
            return;
        }
        try{
        let newChannelName = '';
        args[0] = args[0].toLowerCase();
        }catch(error){
            message.channel.send(` \`\`\`${prefix}setup [text,voice,temporaryChannel,embed]\`\`\``);
        }
        switch (args[0]) {
            case 'text':
                newChannelName = ''; 
                for (let i = 1; i < args.length; i++) {
                    newChannelName = newChannelName + args[i] + ' ';
                    console.log(args[i]);
                }
                message.guild.channels.create(newChannelName, {
                    type: 'text',
                    parent: '775234803460472832',
                    permissionOverwrites: [{
                        id: '775231812683300864',
                        allow: ['VIEW_CHANNEL']
                    } ],
                })


                break; //end of setup text
            case 'voice':
                try{
                newChannelName = '';
                for (let i = 1; i < args.length; i++) {
                    newChannelName = newChannelName + args[i] + ' ';
                    console.log(args[i]);
                }
                console.log('newChannelName:' + newChannelName);
                message.guild.channels.create(newChannelName, {
                    type: 'voice',
                    parent: '775427937381908492',
                    permissionOverwrites: [{
                        id: '775231812683300864',
                        allow: ['VIEW_CHANNEL'],
                    }, ],
                })        
                let clickToJoin = [];
                clickToJoin.push(newChannelName);
                console.log(clickToJoin);
                }catch(error){
                    console.log(error);
                    message.channel.send(` \`\`\`${prefix}setup voice [new channel name]\`\`\``);
                }
            break; //end of setup voice
            case 'temporaryChannel':
                try{
                    newChannelName = '';
                    for (let i = 1; i < args.length; i++) {
                        newChannelName = newChannelName + args[i] + ' ';
                        console.log(args[i]);
                    }
                    console.log('newChannelName:' + newChannelName);
                    message.guild.channels.create(newChannelName, {
                        type: 'voice',
                        parent: '788596331886936084',
                        permissionOverwrites: [{
                            id: '775231812683300864',
                            allow: ['VIEW_CHANNEL'],
                        }, ],
                    })        
                    let clickToJoin = [];
                    clickToJoin.push(newChannelName);
                    console.log(clickToJoin);
                    }catch(error){
                        console.log(error);
                        message.channel.send(` \`\`\`${prefix}setup voice [new channel name]\`\`\``);             
                    }
            break; //end of setup temp voice
            case 'embed':
                let embedTitle = '';
                let embedColor = '';
                let embedURL = '';
                let embedThumbnailURL = '';
                let embedFieldTitle = '';
                let embedFieldCaption = '';
                let fieldInline = false;
                let setupMessageCount = 0;
                let messageTimeOut = 300000;
                const embeddedMessage = new Discord.MessageEmbed();

                async function clearPast(setupMsgCount) {
                    console.log()
                    console.log(setupMsgCount + ' item(s) deleted.');
                    message.channel.bulkDelete(setupMsgCount);
                    setupMessageCount = 0;
                }
                setupMessageCount++;
                clearPast(setupMessageCount);
                //QUESTIONS ARE BELOW
                message.channel.send('You will have 5 minutes to answer each question before the command times out.');
                //COLOR
                message.channel.send(`Please enter a hexidecimal color value: (ex. #00FFAA or 00FFAA both work) - Use a color picker application, if needed, to make sure you have chosen your correct desired color. <https://htmlcolorcodes.com/> **If you want to leave something blank, type ${prefix}next. If at any point you want to restart or quit the command, type ${prefix}stop**.`);
                setupMessageCount++;
                setupMessageCount++;
                message.channel.awaitMessages(m => m.author.id == message.author.id, {
                    max: 1,
                    time: messageTimeOut
                }).then(collected => {
                    console.log(collected.first().content);
                    setupMessageCount++;
                    if (collected.first().content == `${prefix}stop`) {
                        messageTimeOut = 0;
                        clearPast(setupMessageCount);
                        return;
                    }
                    if (!(collected.first().content == `${prefix}next`)) {
                        embedColor = collected.first().content;
                        embeddedMessage.setColor(embedColor);
                    } else {
                        embedColor = '#36393F';
                        embeddedMessage.setColor(embedColor)
                    }
                    clearPast(setupMessageCount);


                    message.channel.send(embeddedMessage);
                    //HEADER / TITLE
                    message.channel.send(`Please enter the title for your embedded message: **If you want to leave something blank, type ${prefix}next. If at any point you want to restart or quit the command, type ${prefix}stop**.`);
                    setupMessageCount++;
                    setupMessageCount++;
                    message.channel.awaitMessages(m => m.author.id == message.author.id, {
                        max: 1,
                        time: messageTimeOut
                    }).then(collected => {
                        console.log(collected.first().content);
                        setupMessageCount++;
                        if (collected.first().content == `${prefix}stop`) {
                            messageTimeOut = 0;
                            clearPast(setupMessageCount);
                            return;
                        }
                        if (!(collected.first().content == `${prefix}next`)) {
                            embedTitle = collected.first().content;
                            embeddedMessage.setTitle(embedTitle);
                        }
                        clearPast(setupMessageCount);
                        message.channel.send(embeddedMessage);
                    //URL
                    message.channel.send(`Please enter your URL: **If you want to leave something blank, type ${prefix}next. If at any point you want to restart or quit the command, type ${prefix}stop**.`);
                    setupMessageCount++;
                    setupMessageCount++;
                    message.channel.awaitMessages(m => m.author.id == message.author.id, {
                        max: 1,
                        time: messageTimeOut
                    }).then(collected => {
                        console.log(collected.first().content);
                        setupMessageCount++;
                        if (collected.first().content == `${prefix}stop`) {
                            messageTimeOut = 0;
                            clearPast(setupMessageCount);
                            return;
                        }
                        if (!(collected.first().content == `${prefix}next`)) {
                            embedURL = collected.first().content;
                            embeddedMessage.setURL(embedURL);
                        }
                        clearPast(setupMessageCount);
                        message.channel.send(embeddedMessage);
                        //EMBED DESCRIPTION
                        message.channel.send(`Please enter the description for your embedded message: **If you want to leave something blank, type ${prefix}next. If at any point you want to restart or quit the command, type ${prefix}stop**.`);
                        setupMessageCount++;
                        setupMessageCount++;
                        message.channel.awaitMessages(m => m.author.id == message.author.id, {
                            max: 1,
                            time: messageTimeOut
                        }).then(collected => {
                            console.log(collected.first().content);
                            setupMessageCount++;
                            if (collected.first().content == `${prefix}stop`) {
                                messageTimeOut = 0;
                                clearPast(setupMessageCount);
                                return;
                            }
                            if (!(collected.first().content == `${prefix}next`)) {
                                embedDescription = collected.first().content;
                                embeddedMessage.setDescription(embedDescription);
                            }
                            clearPast(setupMessageCount);

                            message.channel.send(embeddedMessage);
                            //THUMBNAIL
                            message.channel.send(`Please enter a url for your thumbnail: If you need to get the URL of an image that is stored on your computer, click this link, <https://imgur.com/upload>, and upload your image, then right click the image and click **Copy Image Link**, the link should look something like this: <https://i.imgur.com/7pqj8s3.jpg> **If you want to leave something blank, type ${prefix}next. If at any point you want to restart or quit the command, type ${prefix}stop**.`);
                            setupMessageCount++;
                            setupMessageCount++;
                            message.channel.awaitMessages(m => m.author.id == message.author.id, {
                                max: 1,
                                time: messageTimeOut
                            }).then(collected => {
                                setupMessageCount++;
                                if (collected.first().content == `${prefix}stop`) {
                                    messageTimeOut = 0;
                                    clearPast(setupMessageCount);
                                    return;
                                }
                                if (!(collected.first().content == `${prefix}next`)) {
                                    embedThumbnailURL = collected.first().content;
                                    embeddedMessage.setThumbnail(embedThumbnailURL);
                                }

                                clearPast(setupMessageCount);
                                message.channel.send(embeddedMessage);
                                setupMessageCount++;

                                //EMBED FIELDS
                                let p = 0;
                                embedFields();

                                function embedFields() {
                                    let nextThreshold = 0;
                                    p++;
                                    //EMBED FIELD TITLE
                                    message.channel.send(`*Note: for the next 3 questions regarding fields, if you want to skip the fields entirely, type ${prefix}next for all 3, otherwise you may skip them individually. **Make sure inputs are fewer than 256 characters long.***`);
                                    message.channel.send(`Please enter your field title # ${p}: **If you want to leave something blank, type ${prefix}next. If at any point you want to restart or quit the command, type ${prefix}stop**.`);
                                    setupMessageCount++;
                                    setupMessageCount++;
                                    message.channel.awaitMessages(m => m.author.id == message.author.id, {
                                        max: 1,
                                        time: messageTimeOut
                                    }).then(collected => {
                                        console.log(collected.first().content);
                                        setupMessageCount++;
                                        if (collected.first().content == `${prefix}stop`) {
                                            messageTimeOut = 0;
                                            clearPast(setupMessageCount);
                                            return;
                                        }
                                        if (!(collected.first().content == `${prefix}next`)) {
                                            embedFieldTitle = collected.first().content;
                                        } else {
                                            embedFieldTitle = "\u200B";
                                            nextThreshold++;
                                        }

                                        clearPast(setupMessageCount);
                                        //EMBED FIELD DESCRIPTION
                                        message.channel.send(`Please enter your field description #${p}: **If you want to leave something blank, type ${prefix}next. If at any point you want to restart or quit the command, type ${prefix}stop**.`);
                                        setupMessageCount++;
                                        message.channel.awaitMessages(m => m.author.id == message.author.id, {
                                            max: 1,
                                            time: messageTimeOut
                                        }).then(collected => {
                                            console.log(collected.first().content);
                                            setupMessageCount++;
                                            if (collected.first().content == `${prefix}stop`) {
                                                messageTimeOut = 0;
                                                clearPast(setupMessageCount);
                                                return;
                                            }
                                            if (!(collected.first().content == `${prefix}next`)) {
                                                embedFieldCaption = collected.first().content;
                                            } else {
                                                embedFieldCaption = "\u200B";
                                                nextThreshold++;
                                            }

                                            clearPast(setupMessageCount);
                                            //INLINE FIELD???
                                            message.channel.send(`Would you like field #${p} to be inline? (yes/no) **If you want to leave something blank, type ${prefix}next. If at any point you want to restart or quit the command, type ${prefix}stop**.`);
                                            setupMessageCount++;
                                            message.channel.awaitMessages(m => m.author.id == message.author.id, {
                                                max: 1,
                                                time: messageTimeOut
                                            }).then(collected => {
                                                console.log(collected.first().content);
                                                setupMessageCount++;
                                                if (collected.first().content == `${prefix}stop`) {
                                                    messageTimeOut = 0;
                                                    clearPast(setupMessageCount);
                                                    return;
                                                }
                                                if (!(collected.first().content == `${prefix}next`)) {

                                                    if (collected.first().content == 'yes') {
                                                        fieldInline = true;
                                                    } else {
                                                        fieldInline = false;
                                                    }
                                                } else {
                                                    fieldInline = false;
                                                    nextThreshold++;
                                                }
                                                clearPast(setupMessageCount);
                                                if (nextThreshold < 3) {
                                                    embeddedMessage.addFields({
                                                        name: embedFieldTitle,
                                                        value: embedFieldCaption,
                                                        inline: fieldInline
                                                    });
                                                }
                                                message.channel.send(embeddedMessage);
                                                //MORE FIELDS???
                                                message.channel.send('Do you want to add more fields? (yes/no)');
                                                message.channel.awaitMessages(m => m.author.id == message.author.id, {
                                                    max: 1,
                                                    time: 120000
                                                }).then(collected => {
                                                    console.log(collected.first().content);
                                                    setupMessageCount++;
                                                    setupMessageCount++;
                                                    setupMessageCount++;
                                                    if (collected.first().content == `${prefix}stop`) {
                                                        messageTimeOut = 0;
                                                        clearPast(setupMessageCount);
                                                        return;
                                                    }
                                                    if (collected.first().content.toLowerCase() == 'yes') {
                                                        clearPast(setupMessageCount);
                                                        embedFields();
                                                    } else {
                                                        message.channel.send(`Please enter some emojis you would like JodBot to react with to your embed: **If you want to leave something blank, type ${prefix}next. If at any point you want to restart or quit the command, type ${prefix}stop**.`);
                                                        setupMessageCount++;
                                                        setupMessageCount++;
                                                        message.channel.awaitMessages(m => m.author.id == message.author.id, {
                                                            max: 1,
                                                            time: messageTimeOut
                                                        }).then(collected => {
                                                            console.log(collected.first().content);
                                                            const emojis = collected.first().content.split(/ +/);
                                                            console.log(emojis);
                                                            setupMessageCount++;
                                                            if (collected.first().content == `${prefix}stop`) {
                                                                messageTimeOut = 0;
                                                                clearPast(setupMessageCount);
                                                                return;
                                                            }
                                                            if (!(collected.first().content == `${prefix}next`)) {
                                                                emoji = '';
                                                            }
                                                                clearPast(setupMessageCount);
                                                                for(i in emojis){
                                                                message.channel.send({embed: embeddedMessage}).then(embedMessage => {
                                                                    setTimeout(() => embedMessage.react(emojis[i]),750);
                                                                });
                                                                }
                                                                console.log('Embed Complete.')
                                                            })
                                                        }
                                                    })
                                                })
                                            })
                                        })
                                    } 
                                })
                            })
                        })
                    })
                })
            break; //end of setup embed
        }
    }
}
