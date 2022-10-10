    let userMessageEvents = [];
    let userCommandEvents = [];
    let userReactionEvents = [];
    let lastTime = 0;
    let thisTime = 0;
    let limit = {
        command: {
            cooldown: 3,
            mute: 7
        },
        message: {
            cooldown: 8,
            mute: 12,
        },
        reaction: {
            cooldown: 4,
            mute: 8,
        }
    }
    module.exports = async (client,Discord,object,event,user,prefix) => {
        if(user.bot) return;
        const guild = client.guilds.cache.get('775222016080871424');
        switch(event){
            case 'message':
                if(user.bot)return;
                return await spamCheckMessage(object);
                async function spamCheckMessage(object){
                    try{
                        let userMessageEventObject = await findObjectByKey(userMessageEvents, 'user', user.id);
                    }catch(error) {}
                    if(!findObjectByKey(userMessageEvents, 'user', user.id)!==null){
                        userMessageEvents.push({
                            user: user.id,
                            lastTime: 0,
                            thisTime: 0,
                            messageCount: 1,
                            cooldownStart: 0,
                            warnings: 0,
                        })
                    }
                    let time = new Date();
                    userMessageEventObject = await findObjectByKey(userMessageEvents, 'user', user.id);
                    userMessageEventObject.lastTime = userMessageEventObject.thisTime;
                    userMessageEventObject.thisTime = time.getTime();
                    if(userMessageEventObject.thisTime - userMessageEventObject.lastTime < 5000){
                        userMessageEventObject.messageCount++;
                    }else{
                        userMessageEventObject.messageCount = 0;
                    }
                    if(userMessageEventObject.thisTime - userMessageEventObject.lastTime < 10000 && userMessageEventObject.messageCount >= limit.message.cooldown){ 
                        object.delete();
                        //console.log(userMessageEventObject.messageCount)
                        if(userMessageEventObject.messageCount === limit.message.cooldown){
                            //userMessageEventObject.warnings++;
                            //user.send(new Discord.MessageEmbed().setTitle(`Notice:`).setDescription(`You\'ve been put on a 10 second cooldown to prevent \`command/message\` spamming, this has been logged for server moderators. Please refrain from further spamming to avoid temporary mutes, thanks!\n- Gamenight Moderation`));            
                            //channel = guild.channels.cache.get('795771203532226610');
                            //channel.send(`${user} was warned for spamming commands. This is their ${userMessageEventObject.warnings == 1?'1st':userMessageEventObject.warnings == 2?'2nd':'last'}, at 3 warnings the user will recieve a strike.`);
                        }
                        if(userMessageEventObject.messageCount === limit.message.mute){
                            //const channel = guild.channels.cache.get('785312951312842752');
                            //channel.send(`${prefix}softban ${user} 4 Spamming commands`)
                            
                            //client.commands.get('softban').execute(message,args,Discord,client,prefix,authorID,fetch,config);
                        }
                        return true;
                    }else{

                        return false;
                    }
                }
            break;
            case 'command':
                if(user.bot)return;
                return await spamCheckCommand(object);
                async function spamCheckCommand(object){
                    try{
                        let userCommandEventObject = await findObjectByKey(userCommandEvents, 'user', user.id);
                    }catch(error) {}
                    if(!findObjectByKey(userCommandEvents, 'user', user.id)!==null){
                        userCommandEvents.push({
                            user: user.id,
                            lastTime: 0,
                            thisTime: 0,
                            commandCount: 1,
                            cooldownStart: 0,
                            warnings: 0,
                        })
                    }
                    let time = new Date();
                    userCommandEventObject = await findObjectByKey(userCommandEvents, 'user', user.id);
                    userCommandEventObject.lastTime = userCommandEventObject.thisTime;
                    userCommandEventObject.thisTime = time.getTime();
                    if(userCommandEventObject.thisTime - userCommandEventObject.lastTime < 5000){
                        userCommandEventObject.commandCount++;
                    }else{
                        userCommandEventObject.commandCount = 0;
                    }
                    if(userCommandEventObject.thisTime - userCommandEventObject.lastTime < 10000 && userCommandEventObject.commandCount >= limit.command.cooldown){ 
                        object.delete();
                        if(userCommandEventObject.commandCount === limit.command.cooldown){
                            //userCommandEventObject.warnings++;
                            //user.send(new Discord.MessageEmbed().setTitle(`Notice:`).setDescription('You\'ve been put on a 10 second cooldown to prevent `command` spamming, this has been logged for server moderators. Please refrain from further spamming to avoid temporary mutes, thanks!\n- Gamenight Moderation'));            
                            //channel = guild.channels.cache.get('795771203532226610');
                            //channel.send(`${user} was warned for spamming commands. This is their ${userCommandEventObject.warnings == 1?'1st':userCommandEventObject.warnings == 2?'2nd':'last'}, at 3 warnings the user will recieve a strike.`);
                        }
                        if(userCommandEventObject.commandCount === limit.command.mute){
                            //const channel = guild.channels.cache.get('785312951312842752');
                            //channel.send(`${prefix}softban ${user} 4 Spamming commands`)
                        }
                        return true;
                    }else{

                        return false;
                    }
                }
            break;
            //reactions
            case 'reaction':
                //console.log(object)
                if(user.bot)return;
                return await spamCheckReaction(object);
                async function spamCheckReaction(object){
                    try{
                        let userReactionEventObject = await findObjectByKey(userReactionEvents, 'user', user.id);
                    }catch(error) {}
                    if(!findObjectByKey(userReactionEvents, 'user', user.id)!==null){
                        userReactionEvents.push({
                            user: user.id,
                            lastTime: 0,
                            thisTime: 0,
                            reactionCount: 1,
                            cooldownStart: 0,
                            warnings: 0,
                        })
                    }

                    let time = new Date();
                    userReactionEventObject = await findObjectByKey(userReactionEvents, 'user', user.id);
                    userReactionEventObject.lastTime = userReactionEventObject.thisTime;
                    userReactionEventObject.thisTime = time.getTime();
                    if(userReactionEventObject.thisTime - userReactionEventObject.lastTime < 2000){
                        userReactionEventObject.reactionCount++;
                    }else{
                        userReactionEventObject.reactionCount = 0;
                    }
                    if(userReactionEventObject.thisTime - userReactionEventObject.lastTime < 5000 && userReactionEventObject.reactionCount >= limit.reaction.cooldown){ 
                        //console.log(userReactionEventObject.reactionCount)
                        if(userReactionEventObject.reactionCount === limit.reaction.cooldown) {
                            userReactionEventObject.warnings++;
                            //user.send(new Discord.MessageEmbed().setTitle(`Notice:`).setDescription(`You\'ve been put on a 10 second cooldown to prevent \`reaction\` spamming, this has been logged for server moderators. Please refrain from further spamming to avoid temporary mutes, thanks!\n- Gamenight Moderation`));            
                            //channel = guild.channels.cache.get('795771203532226610');
                            //channel.send(`${user} was warned for spamming reactions. This is their ${userReactionEventObject.warnings == 1?'1st':userReactionEventObject.warnings == 2?'2nd':'last'} warning, ${userReactionEventObject.warnings !== 3?'at 3 warnings the user will recieve a strike':'user has recieved a strike.'}.`);
                        }
                        if(userReactionEventObject.reactionCount === limit.reaction.mute) {
                            //const channel = guild.channels.cache.get('785312951312842752');
                            //channel.send(`${prefix}softban ${user} 4 Spamming reactions`)
                        }
                        return true;
                    }else{

                        return false;
                    }
                }
            break;
            //voiceState
            case 'voiceState':

            break;
        }
    }


function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
    }