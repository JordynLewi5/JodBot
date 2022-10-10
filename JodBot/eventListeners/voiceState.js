const party = require("../commands/party");

module.exports = (client,Discord,prefix) => {

    let listOfParties = JSON.parse(localStorage.getItem('listOfParties'));
    let partyQueue = JSON.parse(localStorage.getItem('partyQueue'));
    const guild = client.guilds.cache.get('775222016080871424');

    deleteEmptyParties(client,Discord,listOfParties,guild);

    //voiceState eventListener
    client.on('voiceStateUpdate', async(oldState, newState) => {
        listOfParties = JSON.parse(localStorage.getItem('listOfParties'));
        //Kick new bot from channel if bot is already in the channel.
        setTimeout(async () => {
            if (newState.channelID != null) {
                let botCount = 0
                await newState.channel.members.map(_member => {
                    if (_member.user.bot) botCount++;
                })
                if (botCount > 1) {
                    const check = await checkIfVCMatchesVCinParty(newState.channelID, await listOfParties);
                    await newState.member.voice.setChannel(null);

                    console.log(check.inParty);
                    if (check.inParty) {
                        return guild.channels.cache.get(check.chatID).send(new Discord.MessageEmbed().setDescription(`You can only have up to **1** music bot in a voice channel. This is to let other users use them freely.`));
                    } else {
                        return guild.channels.cache.get('775422372891197500').send(new Discord.MessageEmbed().setDescription(`You can only have up to **1** music bot in a voice channel. This is to let other users use them freely.`));
                    }
                }
            }
        }, 1000);


        //listOfParties = JSON.parse(localStorage.getItem('listOfParties'));

        let partyLimit = JSON.parse(localStorage.getItem('maxParties'));

        //if (oldState.member.user.bot) return;
        const member = newState.member;
        //console.log(`${member.user.username} updated their voice state.`)

        //Detect when user joins party creator
        switch(newState.channelID){
            case '791400742245367848':
                const playingChannel = guild.channels.cache.get('792137476629594132');
                playingChannel.updateOverwrite(member, { VIEW_CHANNEL: true });
            break;
            case '789198688018759690':
                await member.roles.add(member.guild.roles.cache.find(role => role.name === "party leader"));
                
                if(findObjectByKey(listOfParties, 'userID',member.user.id) !== null){
                    try{
                        await guild.member(member.user.id).voice.setChannel(findObjectByKey(listOfParties, 'userID',member.user.id).voiceChannel);
                        return;
                    }catch(error){
                        const partyObject = findObjectByKey(listOfParties, 'userID',member.id);
                        channel = guild.channels.cache.get(partyObject.voiceChannel);
                        try{await channel.delete();}catch(error) {}
                        channel = guild.channels.cache.get(partyObject.chatChannel);
                        try{await channel.delete();}catch(error) {}
                        channel = guild.channels.cache.get(partyObject.parentCategory);
                        try{await channel.delete();}catch(error) {}
                        console.log(listOfParties.indexOf(party => party.user === partyObject.userID));
                        await listOfParties.splice(listOfParties.findIndex(party => party.userID === partyObject.userID),1);
                        localStorage.setItem('listOfParties', JSON.stringify(listOfParties));
                    }
                }
                setTimeout(async () => {
                    //define waiting room
                    let channel = guild.channels.cache.get('800600463677587466');
                    //add user to waiting list
                    await partyQueue.push({memberID: member.id});
                    //update local storage
                    localStorage.setItem('partyQueue',JSON.stringify(partyQueue));
                    //move user to waiting room channel
                    try { await guild.member(member.user.id).voice.setChannel(channel); } catch(error) {}
                    //check if max number of parties has been reached
                    setTimeout(async () => {
                        if (listOfParties.length < partyLimit && member.voice.channelID === channel.id){
                            //await member.roles.add(member.guild.roles.cache.find(role => role.name === "party leader"));
                            //create party function
                            await createParty(client,Discord,listOfParties,guild,member,prefix);
                        } else {
                            await member.roles.remove(member.guild.roles.cache.find(role => role.name === "party leader"));
                        }
                    }, 2000);

                }, 200);
            break;


            //give user party perms when user joins party voicechannel
            case(findObjectByKey(listOfParties, 'voiceChannel', newState.channelID)?findObjectByKey(listOfParties, 'voiceChannel',newState.channelID).voiceChannel:''):
                    //define party object from user's new channel
                    const partyObject = findObjectByKey(listOfParties, 'voiceChannel',newState.channelID);

                    //define party channels
                    const voiceChannel = guild.channels.cache.get(partyObject.voiceChannel);
                    const textChannel = guild.channels.cache.get(partyObject.chatChannel);

                    //update user permissions
                    await voiceChannel.updateOverwrite(newState.member, { CONNECT: true });
                    await textChannel.updateOverwrite(newState.member, { VIEW_CHANNEL: true });                        

            break;
        }



        //leave vc
        switch(oldState.channelID){
            case '791400742245367848':
                const playingChannel = guild.channels.cache.get('792137476629594132');
                playingChannel.updateOverwrite(member, { VIEW_CHANNEL: false });
            break;

            //leave waiting room
            case '800600463677587466':
                
                partyQueue = JSON.parse(localStorage.getItem('partyQueue'));
                await partyQueue.splice(partyQueue.indexOf(findObjectByKey(partyQueue, 'memberID',member.id)),1);
                localStorage.setItem('partyQueue',JSON.stringify(partyQueue));
            break;
            //leave party
            case(findObjectByKey(listOfParties, 'userID',member.user.id)?findObjectByKey(listOfParties, 'userID',member.id).voiceChannel:''):
                listOfParties = JSON.parse(localStorage.getItem('listOfParties'));

                try{
                    const partyObject = findObjectByKey(listOfParties, 'userID',member.id);
                    if (partyObject !== null){
                        const voiceChannel = guild.channels.cache.get(partyObject.voiceChannel);
                        if(oldState.channelID == partyObject.voiceChannel && newState.channelID !== partyObject.voiceChannel){

                            let size = 0; 
                            await voiceChannel.members.map(m => {
                                if (!m.user.bot) size ++;
                            })
                            if (size == 0) {
                                //define party object
                                const partyObject = findObjectByKey(listOfParties, 'userID', member.id);

                                //define and delete all channels within a party
                                channel = guild.channels.cache.get(partyObject.voiceChannel);
                                try{await channel.delete();}catch(error) {}
                                channel = guild.channels.cache.get(partyObject.chatChannel);
                                try{await channel.delete();}catch(error) {}
                                channel = guild.channels.cache.get(partyObject.parentCategory);
                                try{await channel.delete();}catch(error) {}

                                //remove party info from arrays
                                await listOfParties.splice(listOfParties.findIndex(party => party.userID === partyObject.userID),1);

                                //update local storage
                                localStorage.setItem('listOfParties', JSON.stringify(listOfParties));

                                //emit party end event
                                try{
                                    await createParty(client,Discord,listOfParties,guild,guild.members.cache.get(partyQueue[0].memberID),prefix);
                                }catch(error) {}
                            }else{
                                const partyMembers = [];
                                voiceChannel.members.forEach((x) => {
                                try {
                                    //we set the voice channel for every member
                                    if (!x.user.bot) partyMembers.push(x.voice);
                                    //console.log(partyMembers);
                                }catch(error){
                                    //console.log(error);
                                }
                            })
                            for(let i = 0; i < partyMembers.length; i++){                                        
                                if(!guild.members.cache.get(partyMembers[i].id).bot){
                                    partyObject.userID = partyMembers[i].id;
                                    i = partyMembers.length;
                                }
                            }

                            channel = await guild.channels.cache.get(partyObject.chatChannel);
                            await channel.send(`<a:ablobleave:791766993010556988> The party leader left the channel, <@${partyObject.userID}> has been made the new party leader.`)
                            console.log('not added')

                            _member = await guild.members.cache.get(await partyObject.userID);
                            await _member.roles.add(guild.roles.cache.find(role => role.name === "party leader"));
                            console.log('added')
                            let listOfParties = JSON.parse(localStorage.getItem('listOfParties'));

                            await listOfParties.splice(listOfParties.findIndex(party => party.userID === partyObject.userID), 1, partyObject);
                            localStorage.setItem('listOfParties', JSON.stringify(listOfParties));
                            

                            
                        }

                        setTimeout(async () => {
                            await member.roles.remove(member.guild.roles.cache.find(role => role.name === "party leader"));
                        }, 1000)
                    }
                }
            }catch(error){
                console.log(error)
            }
            break;
            case '791400742245367848':
                async () => {
                    await member.setMute(false);
                }
            break;
        }
    })
}

// class userPartyChannels {
//     constructor(userID,parentCategory,voiceChannel,chatChannel){
//         this.userID = userID;
//         this.parentCategory = parentCategory;
//         this.voiceChannel = voiceChannel;
//         this.chatChannel = chatChannel;
//     }
// }
function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}
async function mute(member){
    //await member.setMute(true,'cause I said so.');
}

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


/*
* Create party 
* function
* Does the stuff
*/
async function createParty(client,Discord,listOfParties,guild,member,prefix){
    let partiesCreated = JSON.parse(localStorage.getItem('partiesCreated'));
    partiesCreated ++;
    localStorage.setItem('partiesCreated', partiesCreated);
    const creatorChannelPosition = guild.channels.cache.get('805211053164199976').position;
    guild.channels.create(`[💬🔊] ${member.user.username}#${member.user.discriminator}\'s Party`, { 
        type: 'category',
        permissionOverwrites: [{
            id: '785238133124890634',
            deny: ['VIEW_CHANNEL'],
        }]
    })
    .then (async channel => {
        const parentCategory = channel;
        const parentCategoryID = channel.id;
        channel.setPosition(creatorChannelPosition + 1);
        await guild.channels.create('🔊│party voicechat', {
            type: 'voice',
            parent: parentCategoryID,
            permissionOverwrites: [
                {
                    id: '775222016080871424',//contestants
                    deny: ['CONNECT'],//deny view
                },
                {
                    id: '784623100271919125',//muted
                    deny: ['CONNECT'],//deny view
                },
                {
                    id: '797667147295096852',//maintenance
                    deny: ['CONNECT'],//deny view
                },
                {
                    id: '785238133124890634',//unverified users
                    deny: ['CONNECT'],//deny view
                },
                {
                    id: member.id,//user
                    allow: ['CONNECT'],//allow view
                },
                {
                    id: '821884772188028990',//user
                    allow: ['CONNECT'],//allow view
                },
            ],
        }).then(async channel => {
            const voiceChannel = channel;
            const voiceChannelID = channel.id;
            channel.setUserLimit(10);
            console.log(member.voice.channelID);
            
            await guild.channels.create('💬│party chat', {
                type: 'text',
                parent: parentCategoryID,
                permissionOverwrites: [
                {
                    id: '775222016080871424',//contestants
                    deny: ['VIEW_CHANNEL'],//deny view
                },
                {
                    id: '784623100271919125',//muted
                    deny: ['VIEW_CHANNEL'],//deny view
                },
                {
                    id: '784623100271919125',//muted
                    deny: ['SEND_MESSAGES'],//deny messages
                },
                {
                    id: '797667147295096852',//maintenance
                    deny: ['VIEW_CHANNEL'],//deny view
                },
                {
                    id: '785238133124890634',//unverified users
                    deny: ['VIEW_CHANNEL'],//deny view
                },
                {
                    id: member.id,//user
                    allow: ['VIEW_CHANNEL'],//allow view
                },
                {
                    id: '821884772188028990',//user
                    allow: ['VIEW_CHANNEL'],//allow view
                },
                ],
            }).then(async channel => {
                const chatChannel = channel;
                chatChannel.setTopic(`**❗ Click to read ❗**\n\nOur custom party system enables you to maximize your Gamenight experience.\n\nCheck out <#789239937429798952> for more information or simply use **${prefix}help party** for the list of **party** commands.\n\nUse **${prefix}help** for the Gamenight commands help directory.`);
                const chatChannelID = channel.id;
                const partyInfo = new Discord.MessageEmbed()
                .setTitle(`Hey, ${member.user.username}! I\'ve created a brand new party for you!`)
                .setDescription(`Your party is currently [\`private\`](https://media4.giphy.com/media/okH2QstpUBcGYjokya/giphy.gif) so other users cannot join your voice channel or read your chat, but you can customize the party privacy settings with a few simple commands.\n\n*Check out **<#789239937429798952>** for more \ninformation or use \`${prefix}help party\`.\nYou can also find more commands with \`-help\`.*`)
                .setThumbnail('https://i.imgur.com/69cyLqt.png')
                .setColor(Math.random() * 5000000 + 11777214);
                channel.send(partyInfo);
                channel.send(`${member.user}`).then(message => {
                    message.delete();
                })
                let parties = {
                    userID: member.user.id,
                    parentCategory: parentCategoryID,
                    voiceChannel: voiceChannelID,
                    chatChannel: chatChannelID,
                    lastTitleChanges : {
                        user: member.id,
                        lastTime: 0,
                        thisTime: 0,
                        pending: false
                    }
                }
                await listOfParties.push(parties);
                localStorage.setItem('listOfParties', JSON.stringify(listOfParties));

                
                //check if channel is empty 1 seconds after creation
                if (member.voice.channelID !== null) {
                    try{ await member.voice.setChannel(voiceChannel); } catch(error) {}
                } else {
                    async () => {
                        //get party of user from listOfParties 
                        const partyObject = findObjectByKey(listOfParties, 'userID',member.id);
    
                        //remove party leader role from user
                        await member.roles.remove(member.guild.roles.cache.find(role => role.name === "party leader"));
                        
                        //delete party channels from server 
                        try{
                            await parentCategory.delete();
                        }catch (error) {console.log(error);}
                        try{
                            await voiceChannel.delete();
                        }catch (error) {console.log(error);}
    
                    }
                }
                setTimeout(async () => {
                    if(voiceChannel.members.size === 0){
                        
                        //get party of user from listOfParties 
                        const partyObject = findObjectByKey(listOfParties, 'userID',member.id);
                        
                        //remove party leader role from user
                        await member.roles.remove(member.guild.roles.cache.find(role => role.name === "party leader"));
                        
                        //delete party channels from server 
                        try{channel = await guild.channels.cache.get(partyObject.voiceChannel)}catch(error) {};
                        try{await channel.delete();}catch(error) {}
                        try{channel = await guild.channels.cache.get(partyObject.chatChannel)}catch(error) {};
                        try{await channel.delete();}catch(error) {}
                        try{channel = await guild.channels.cache.get(partyObject.parentCategory)}catch(error) {};
                        try{await channel.delete();}catch(error) {}

                        //remove party from lists
                        try{await listOfParties.splice(listOfParties.findIndex(party => party.userID === partyObject.userID),1);
                        }catch(error) {};

                        //update localStorage
                        localStorage.setItem('listOfParties', JSON.stringify(listOfParties));
                    }
                }, 1000);
            });
        });  
    });
}

function deleteEmptyParties(client,Discord,listOfParties,guild) {
    listOfParties.map(async _party => {
        console.log(`Checking (${_party.userID})'s party if empty.`)
        //delete party channels from server 
        let voiceChannel = await guild.channels.cache.get(_party.voiceChannel);
        let textChannel = await guild.channels.cache.get(_party.chatChannel);
        let parentCategory = await guild.channels.cache.get(_party.parentCategory);

        try {
            if (voiceChannel === undefined && (textChannel !== undefined || parentCategory !== undefined)|| voiceChannel.members.size === 0 || (voiceChannel.members.size === 1 && voiceChannel.members.entries().next().value.bot)) {
                try {
                    //delete voice channel
                    await voiceChannel.delete();
                } catch (err) {
                    if (err.name === 'TypeError') console.log(`Couldn't delete voice channel.`);
                }
                try {
                    //delete text channel
                    await textChannel.delete();
                } catch (err) {
                    if (err.name === 'TypeError') console.log(`Couldn't delete text channel.`);
                }
                try {
                    //delete parent category
                    await parentCategory.delete();
                } catch (err) {
                    if (err.name === 'TypeError') console.log(`Couldn't delete parent category.`);
                }

                //remove party from list
                await listOfParties.splice(listOfParties.findIndex(party => party.userID === _party.userID),1);
                localStorage.setItem('listOfParties', JSON.stringify(listOfParties));
                console.log('Party deleted.');
            }
        } catch (err) {
            if (err.name === 'TypeError') console.log(`All parties have already closed.`);
        }
        await guild.member(_party.userID).roles.remove(guild.roles.cache.find(role => role.name === "party leader"));

    });
    console.log(`Done.`);

}

async function checkIfVCMatchesVCinParty(vcID, _listOfParties) {
    let inParty = false;
    let chatChannel;
    await _listOfParties.map(async _party => {
        console.log(_party)
        console.log('party vc ', _party.voiceChannel);
        console.log('vcID ', vcID)
        if (_party.voiceChannel == vcID) {
            inParty = true;
            chatChannel = _party.chatChannel;
            console.log('in party!')
        }
    })
    console.log('InParty? ', inParty)
    return obj = {
        inParty: inParty,
        chatID: chatChannel
    }
}
