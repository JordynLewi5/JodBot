
module.exports = {
    name: 'party',
    description: 'party commands',
    async execute(message,args,Discord,client,prefix){
        //perms
        if (!(message.member.roles.cache.find(r => r.name === "Admin") || message.member.roles.cache.find(r => r.name === "Bots") || message.member.roles.cache.find(r => r.name === "party leader") || message.member.roles.cache.find(r => r.name === "Contestant"))) {
            //send error message to channel
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions to run this command here.'));            
        }
        
        if (args[0] !== undefined) {
            args[0] = args[0].toLowerCase();
        } else {
            return;
        }

        //get listofparties from local storage
        let listOfParties = JSON.parse(localStorage.getItem('listOfParties'));

        //check if author is party leader
        if(await findObjectByKey(listOfParties,'userID',message.author.id) === null && !message.member.roles.cache.find(r => r.name === "Admin")){
            //send error message to channel
            return message.channel.send(new Discord.MessageEmbed().setDescription('You must be the **party leader** to configure party settings.'));            
        }

        //define noArgCommands
        const noArgCommands = ['help', 'public', 'private', 'title', 'access', 'invite', 'claim'];

        //check for invalid args
        if(args[1] === undefined && !noArgCommands.includes(args[0])){
            //send error message to channel
            return message.channel.send(new Discord.MessageEmbed().setDescription(`Invalid or no arguments provided.\n**Correct format: \`${prefix}party [command] [argument]\`\nExample: \`${prefix}party add @username\`**`));
        }

        //define all variables in this scope
        let party = findObjectByKey(listOfParties,'userID', message.author.id); //get the party associated with the user

        if (message.member.roles.cache.find(r => r.name === "Admin") && findObjectByKey(listOfParties,'userID', message.author.id) === null) 
            party = findObjectByKey(listOfParties, 'voiceChannel', message.member.voice.channel.id); //get the party associated with the user
        
        const voiceChannel = message.guild.channels.cache.get(party.voiceChannel);
        const textChannel =  message.guild.channels.cache.get(party.chatChannel);
        const parentCategory =  message.guild.channels.cache.get(party.parentCategory);
        const guild = message.guild;
        const everyone = message.guild.roles.cache.find(r => r.id === "775222016080871424");

       
        //Party commands below
        switch(args[0]){
            //party add command
            case 'add':
                try{
                    //define mention member
                    mention = await defineMention(args, guild, message, textChannel, Discord);
                    if (mention === null) return;
                    //overwrite user permissions for channel
                    voiceChannel.updateOverwrite(mention, { CONNECT: true });
                    textChannel.updateOverwrite(mention, { VIEW_CHANNEL: true });
                    //sends message to channel
                    textChannel.send(new Discord.MessageEmbed().setDescription(`**${mention.user.tag}** has been **added** to the party.`));
                }catch(error){
                    textChannel.send(new Discord.MessageEmbed().setDescription(`Unable to **add** user.\nSpecified user does not exist.`));
                }
            break;
            case 'neutral':
                try{
                    //define mention member
                    mention = await defineMention(args, guild, message, textChannel, Discord);
                    if (mention === null) return;
                    //overwrite user permissions for channel
                    voiceChannel.updateOverwrite(mention, { CONNECT: null });
                    textChannel.updateOverwrite(mention, { VIEW_CHANNEL: null });
                    //sends message to channel
                    textChannel.send(new Discord.MessageEmbed().setDescription(`**${mention.user.tag}**'s permissions have been set to neutral.`));
                }catch(error){
                    textChannel.send(new Discord.MessageEmbed().setDescription(`Unable to **neutralize** user.\nSpecified user does not exist.`));
                }
            break;
            //party remove command
            case 'remove':
                try{
                    //define mention member
                    mention = await defineMention(args, guild, message, textChannel, Discord);
                    if (mention === null) return;
                    //overwrite user permissions for channel
                    voiceChannel.updateOverwrite(mention, { CONNECT: false });
                    textChannel.updateOverwrite(mention, { VIEW_CHANNEL: false });
                    if(mention.voice.channelID == voiceChannel.id) mention.voice.setChannel(null);
                    //sends message to channel
                    textChannel.send(new Discord.MessageEmbed().setDescription(`**${mention.user.tag}** has been **removed** to the party.`));
                }catch(error) {
                    //send error message to channel
                    return textChannel.send(new Discord.MessageEmbed().setDescription(`Unable to **remove** user.\nSpecified user does not exist.`));
                }
            break;
            //party public command
            case 'public':
                try{
                    //adds permissions to everyone role for the party channel
                    voiceChannel.updateOverwrite(everyone, { CONNECT: true });
                    textChannel.updateOverwrite(everyone, { VIEW_CHANNEL: true });
                    //sends message to channel
                    textChannel.send(new Discord.MessageEmbed().setDescription(`Your party has been made **public**.\n\n*Note: Users that you've manually removed will **not** be able to join.*`));
                }catch(error) {
                    //send error message to channel
                    return textChannel.send(new Discord.MessageEmbed().setDescription(`Couldn't make the party public.`));
                }
            break;
            //party private command
            case 'private':
                try{
                    //adds permissions to everyone role for the party channel
                    voiceChannel.updateOverwrite(everyone, { CONNECT: false });
                    textChannel.updateOverwrite(everyone, { VIEW_CHANNEL: false });
                    //sends message to channel
                    textChannel.send(new Discord.MessageEmbed().setDescription(`Your party has been made **private**, no new users will be able to join.`));
                }catch(error) {}
            break;
            //party kick command
            case 'kick':
                try{
                    mention = await defineMention(args, guild, message, textChannel, Discord);
                    if (mention === null) return;

                    if(mention.voice.channelID !== voiceChannel.id) return textChannel.send(new Discord.MessageEmbed().setDescription(`User is not in your voice channel.`));

                    //moves user out of channel, but does not remove them from the party
                    mention.voice.setChannel(null);
                    textChannel.send(new Discord.MessageEmbed().setDescription(`**${mention.user.tag}** has been **kicked** from the party. They can still join back, though to remove from the party use \`${prefix}party remove [@mention]\``));

                }catch(error) {
                    //send error message to channel
                    textChannel.send(new Discord.MessageEmbed().setDescription(`Unable to **kick** user.\nSpecified user does not exist.`));
                }
            break;
            case 'leader':
                mention = await defineMention(args, guild, message, textChannel, Discord);
                if (mention === null) return;

                if(mention.voice.channelID !== voiceChannel.id) return textChannel.send(new Discord.MessageEmbed().setDescription(`User must be in your voice channel.`));
                await message.member.roles.remove(guild.roles.cache.find(role => role.name === "party leader"));
                await mention.roles.add(guild.roles.cache.find(role => role.name === "party leader"));

                party.userID = mention.user.id;

                await listOfParties.splice(listOfParties.findIndex(party => party.userID === party.userID), 1, party);
                localStorage.setItem('listOfParties', JSON.stringify(listOfParties));

                textChannel.send(new Discord.MessageEmbed().setDescription(`${mention} is the new **party leader** and can configure the party settings and use party commands. Use \`${prefix}help party\` for list the of party commands.`))
            break;
            //party claim
            case 'claim':
                if (!message.member.roles.cache.find(r => r.name === "Admin")) 
                    return textChannel.send(new Discord.MessageEmbed().setDescription(`You don't have access to that command.`));
                
                if(message.member.voice.channelID !== voiceChannel.id) return textChannel.send(new Discord.MessageEmbed().setDescription(`You must be in the party's voicechat.`));
                await message.member.roles.remove(guild.roles.cache.find(role => role.name === "party leader"));
                await message.member.roles.add(guild.roles.cache.find(role => role.name === "party leader"));

                party.userID = message.author.id;

                await listOfParties.splice(listOfParties.findIndex(party => party.chatChannel === message.channel.id), 1, party);
                localStorage.setItem('listOfParties', JSON.stringify(listOfParties));

                textChannel.send(new Discord.MessageEmbed().setDescription(`${message.member} claimed this party.`))
            break;
            //party limit command
            case 'limit':
                //start allowed limit at 10
                let allowedLimit = 10;
                //add to allowedLimit based on user roles
                if(guild.members.cache.get(message.author.id).roles.cache.some(role => role.id === '824361405817815060')) allowedLimit += 10;
                if(guild.members.cache.get(message.author.id).roles.cache.some(role => role.id === '800967584123584522')) allowedLimit += 10;
                if(guild.members.cache.get(message.author.id).roles.cache.some(role => role.id === '822505604764532796')) allowedLimit += 15;
                if(guild.members.cache.get(message.author.id).roles.cache.some(role => role.name === '791395767163813932')) allowedLimit += 10;
                try{
                    //filter out bad arguments
                    if(args[1] <= 0 || isNaN(args[1])){
                        //send error message to channel
                        return textChannel.send(new Discord.MessageEmbed().setTitle(`Invalid user limit`).setDescription(`That's not a valid user limit. Please choose one between \`1\` and \`${allowedLimit}\`.`));
                    }
                    //check if args is greater than user's allowed limit and send message
                    if(args[1] > allowedLimit) {
                        //send error message to channel
                        textChannel.send(new Discord.MessageEmbed().setTitle(`You don't have access to that user limit.`).setDescription(`I've set the user limit to your highest allowed user limit: \`${allowedLimit}\`.\n**<@&791395767163813932>**, **<@&821093832845688833>** and **[VIPs](https://www.gamenight.li/store)** are able to set a higher party user limit.`));
                    }else{
                        //send confirmation message to channel
                        textChannel.send(new Discord.MessageEmbed().setDescription(`User limit set to \`${args[1]}\`.`));  
                    }
                    //set channel user limit
                    voiceChannel.setUserLimit(Math.min(args[1],allowedLimit));
                }catch(error){
                    //send error message to channel
                    textChannel.send(new Discord.MessageEmbed().setDescription(`Unable to set user limit.`));
                }
            break;
            //party game command  
            case 'title':
                if (!((message.member.roles.cache.find(r => r.id === '800967584123584522') || (message.member.roles.cache.find(r => r.id === '822505604764532796')) || (message.member.roles.cache.find(r => r.id === '820943895692443659') || (message.member.roles.cache.find(r => r.id === '821093832845688833')))))) {
                    //send error message to channel
                    return message.channel.send(new Discord.MessageEmbed().setDescription('Sorry, to use this command you must be a **[VIP](https://www.gamenight.li/store)**. You can also use `-vote` for temporary access to this perk.'));            
                }
                //establishes the current time
                let time = new Date();
                let member = message.author;

                listOfParties = JSON.parse(localStorage.getItem('listOfParties'));

                //get the list of title changes before any edits are made
                let thisParty = findObjectByKey(await listOfParties, 'userID', member.id);
                // let lastTitleChanges = await JSON.parse(localStorage.getItem('lastTitleChanges'));
  
                if(thisParty.lastTitleChanges.pending !== false) {
                    return textChannel.send(new Discord.MessageEmbed().setTitle('Slow down!').setDescription('You still have an active **Party Title Editor** open, either cancel that one or wait for it to expire before trying again.'))
                }
                //creates new title profile if it doesn't exist
                if(thisParty.lastTitleChanges == null){
                    thisParty.lastTitleChanges = {
                        user: member.id,
                        lastTime: time.getTime(),
                        thisTime: 0,
                        pending: true
                    }

                }

                listOfParties.splice(listOfParties.findIndex(party => party.userID === thisParty.userID), 1, thisParty);

                localStorage.setItem('listOfParties', JSON.stringify(listOfParties));


                //fetches and stores the user's title change profile
                lastTitle = thisParty.lastTitleChanges;
                //move the previous "this" time to lastTime
                lastTitle.lastTime = lastTitle.thisTime;
                //thisTime is the current time
                lastTitle.thisTime = time.getTime();
                
                //check if cooldown has passed
                try{
                    if(lastTitle.thisTime - lastTitle.lastTime < 300000){
                        return textChannel.send(new Discord.MessageEmbed().setTitle('Slow down!').setDescription(`You can only edit the title once every 5 minutes.\n${msToTimestamp(lastTitle.lastTime - lastTitle.thisTime + 300000)} remaining.`))
                    }
                }catch(error) {}        

                //create emoji selection
                let emojiSelection = ['🎥','📺','<:Twitch:806053977606979584>','🎶','🎤','<:JackboxGames:806054709739388948>','<:AmongUs:806054897920901122>','<:CardsAgainstHumanity:806055381942927380>','♟️','<:minecraft:806055834940997652>','<:rustgame:806056070769803286>','🎮','⏪','❌'];
                
                //send selection menu to channel
                textChannel.send(new Discord.MessageEmbed()
                .setTitle('Party Title Editor')
                .setDescription(`
                In order to prevent abuse, yet also give you the ability to change your party title, we've compiled a list of games and activities for you to choose from. More options will be added in the future per your suggestions in the <#784650629556731904> channel.
                
                __**Emoji - Activity**__
                **
                🎥 - Movie
                📺 - TV show
                <:Twitch:806053977606979584> - Live stream
                🎶 - Music
                🎤 - Karaoke
                <:JackboxGames:806054709739388948> - Jackbox Games
                <:AmongUs:806054897920901122> - Among Us
                <:CardsAgainstHumanity:806055381942927380> - Cards Against Humanity
                ♟️ - Chess
                <:minecraft:806055834940997652> - Minecraft
                <:rustgame:806056070769803286> - Rust
                🎮 - Other Games
                ⏪ - Reset Title

                ❌ - *Cancel*
                **

                Choose the option that best describes your current activity and click the corresponding emoji reaction.`)
                .setFooter('You have 1 minute to make a selection.\nNote: You can only change the title of your party once every 5 minutes so choose wisely.'))
                .then(async (message) => {
                    //add emojis to message
                    emojiSelection.forEach(async emoji => {
                        try{
                            message.react(emoji);//.catch(() => {setTimeout(() => {emojiSelection = []},5000)});
                        } catch(error) {
                            emojiSelection = [];
                        }
                    });
                    
                    //await reaction
                    await message.awaitReactions((reaction, user) => user.id == member.id && (emojiSelection.includes('<:' + reaction.emoji.name + ':' + reaction.emoji.id + '>') || emojiSelection.includes(reaction.emoji.name)),//
                    { max: 1, time: 60000 }).then(async collected => {
                        //reset or cancel title change request
                        if(collected.first().emoji.name == '❌'){
                            thisParty.lastTitleChanges.pending = false;
                            listOfParties.splice(listOfParties.findIndex(party => party.userID === thisParty.userID), 1, thisParty);
                            localStorage.setItem('listOfParties', JSON.stringify(listOfParties));
                            await message.delete();
                            return;
                        }
                        //get title name
                        let title;
                        switch(collected.first().emoji.name) {
                            case 'JackboxGames':
                                title = 'Playing Jackbox.TV';
                            break;
                            case 'AmongUs':
                                title = 'Playing Among Us'
                            break;
                            case 'CardsAgainstHumanity':
                                title = 'Playing CAH'
                            break;
                            case 'minecraft':
                                title = 'Playing Minecraft';
                            break;
                            case 'rustgame':
                                title = 'Playing Rust';
                            break;
                            case '🎥':
                                title = 'Watching Movies';
                            break;
                            case '📺':
                                title = 'Watching TV Shows';
                            break;
                            case 'Twitch':
                                title = 'Watching Live Streams';
                            break;
                            case '🎶':
                                title = 'Listening to Music';
                            break;
                            case '🎮':
                                title = 'Playing Games';
                            break;
                            case '🎤':
                                title = 'Playing Karaoke'
                            break;
                            case '⏪':
                                title = `${member.username}#${member.discriminator}\'s Party`;
                            break;
                            case '♟️':
                                title = 'Playing Chess';
                            break;
                        }
                        
                        //update title
                        setTimeout(async function(){
                            parentCategory.edit({ name: `[💬🔊] ${title}` })
                            .then()
                            .catch(console.error);
                            thisParty.lastTitleChanges.pending = false;
                            listOfParties.splice(listOfParties.findIndex(party => party.userID === thisParty.userID), 1, thisParty);
                            localStorage.setItem('listOfParties', JSON.stringify(listOfParties));

                            //send update message to channel
                            await message.channel.send(new Discord.MessageEmbed().setDescription(`Party title has been updated to "[💬🔊] ${title}".`));
                            setTimeout(async function(){
                                message.delete();
                            },500)
                        },500)
                        

                    }).catch((error) => {
                        message.channel.send(new Discord.MessageEmbed().setDescription('No valid reactions were added.'));
                        thisParty.lastTitleChanges.pending = false;
                        listOfParties.splice(listOfParties.findIndex(party => party.userID === thisParty.userID), 1, thisParty);
                        localStorage.setItem('listOfParties', JSON.stringify(listOfParties));
                        message.delete();
                    });
                })

            break;
            case 'help':
                message.react('<:pingmessage:807824271246098472>');
                //create help menu
                help = new Discord.MessageEmbed()
                .setColor(Math.random() * 10000000 + 6777214)
                .setTitle('Gamenight Help')
                .setDescription
                (`**Party Commands**
                __ᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟ__
  
                **Command: \`${prefix}party add [@mention]\`**
                Add a specific user to the party.
                **Example:** [\`${prefix}party add @user\`](https://i.imgur.com/dsd3Jwa.gif) [\`${prefix}party add @user#1234\`](https://i.imgur.com/k92qqrE.gif)
      
                **Command: \`${prefix}party remove [@mention]\`**
                Remove a specific party member from the party.
                      
                **Command: \`${prefix}party neutral [@mention]\`**
                Resets the permissions of a specific user.
    
                **Command: \`${prefix}party kick [@mention]\`**
                Kick a specific party member from the party voice channel.
      
                **Command: \`${prefix}party public\`**
                Make the party public so that any user can join. 
      
                **Command: \`${prefix}party private\`**
                Make the party private so that new users cannot join.
    
                **Command: \`${prefix}party limit [#]\`**
                Set the voice channel user limit.
                **TIP:** **Server Boosters**, **Voters** and **[VIPs](https://www.gamenight.li/store)** have access to higher user limits.
      
                **Command: \`${prefix}party title\`**
                Will give the party leader a selection of game titles or general activities to choose from to **edit** the party title.
                **TIP:** **[VIPs](https://www.gamenight.li/store)** can use this feature.
        
      
                **Command: \`${prefix}party invite [description of your party]\`**
                Send a public party invite to <#808116293713526836> with an **optional** description.
                **TIP:** **[VIPs](https://www.gamenight.li/store)** have shorter cooldown times.
      
                **Command: \`${prefix}party access\`**
                Display all of the information you'll ever need on who's got access to the party and who does not.
      
                **Command: \`${prefix}party leader [@mention]\`**
                Transfer party leadership to another user in your party.
                `)
                .setThumbnail('https://i.imgur.com/69cyLqt.png')
                //send embed to channel
                message.author.send(help);
            break;
            case 'access':
                    let countAllow = 0;
                    let countDeny = 0;
                    let partyMembersAllow = [];
                    let partyMembersDeny = [];
                    let status = '\`private\`.';
                    voiceChannel.permissionOverwrites.map(member => {
                        //check if mapped member has permissions to access party
                        if(member.allow.bitfield > 0 && member.type === 'member') {
                            partyMembersAllow.push(guild.members.cache.get(member.id));
                            countAllow ++;
                        }
                        //check if mapped member does not have permissions to access party
                        if(member.deny.bitfield > 0 && member.type === 'member') {
                            partyMembersDeny.push(guild.members.cache.get(member.id));
                            countDeny ++;
                        }
                        if(member.allow.bitfield > 0 && member.id === '775222016080871424') {
                            status = `\`public\`, so anyone that has not been removed can join as long as it remains public.`;                        
                        }
                    });
                textChannel.send(new Discord.MessageEmbed()
                    .setTitle(`Here's who can and cannot access your party.`)
                    .setDescription(`Your party is ${status}
                    
                    Added Members: ${partyMembersAllow.join(', ')}
                    Added count: ${countAllow}
                    
                    Removed Members: ${partyMembersDeny.length > 0 ? partyMembersDeny.join(', '):`\`No members have been removed from the party.\``}
                    Removed count: ${countDeny}
                    
                    Party Leader: ${guild.members.cache.find(member => member.id === party.userID)}`));
            break;
            case 'invite':
                let options = {
                    base: 600000,
                    premium: 300000
                }
                let cooldown = options.base;
                if (message.member.roles.cache.some(role => role.id === '800967584123584522') || message.member.roles.cache.some(role => role.id === '822505604764532796'))
                    cooldown = options.premium;


                let privStatus = 'private';
            
                voiceChannel.permissionOverwrites.map(async member => {
                    if(member.allow.bitfield > 0 && member.id === '775222016080871424') {
                        privStatus = 'public';                        
                    }
                });
        
                if(privStatus === 'private') return textChannel.send(new Discord.MessageEmbed().setTitle(`Whoa There!`).setDescription(`Your party is \`private\`. No one can join unless you let them. \nUse \`${prefix}party public\` and try sending the invite again.`));

                //get the list of title changes before any edits are made

                let pendingInvites = await JSON.parse(localStorage.getItem('pendingInvites'));
                let pendingInvite = await findObjectByKey(pendingInvites, 'user', message.author.id);                

                //new pending title if non existing
                if(findObjectByKey(pendingInvites, 'user', message.author.id) == null){
                    pendingInvites.push({
                        user: message.author.id,
                        thisTime: 0,
                        lastTime: 0
                    })
                }
                localStorage.setItem('pendingInvites', JSON.stringify(pendingInvites));

                //establishes the current time
                let time2 = new Date();
                //fetches and stores the user's title change profile
                pendingInvite = await findObjectByKey(pendingInvites, 'user', message.author.id);
                //move the previous "this" time to lastTime
                pendingInvite.lastTime = pendingInvite.thisTime;
                //thisTime is the current time
                pendingInvite.thisTime = time2.getTime();
                
                //check if cooldown has passed
                try{
                    if(pendingInvite.thisTime - pendingInvite.lastTime < cooldown){
                        return textChannel.send(new Discord.MessageEmbed().setTitle('Slow down!').setDescription(`You can only send an invite once every ${msToTimestamp(cooldown)} minutes.\n${msToTimestamp(pendingInvite.lastTime - pendingInvite.thisTime + cooldown)} remaining. \n**[VIP](https://www.gamenight.li/store)** members can send an invite once every **5:00** minutes.`))
                    }
                }catch(error) {}        
                try{
                    localStorage.setItem('pendingInvites', JSON.stringify(pendingInvites));
                } catch(error) {}

                args.shift();
                let messageDescription = args.join(' ');
                console.log(messageDescription)
                //define invite channel
                const inviteChannel = await guild.channels.cache.get('808116293713526836');


                //create invite and send to channel
                const invite = await voiceChannel.createInvite({
                  time: 300000
                });
                inviteChannel.send(new Discord.MessageEmbed()
                .setTitle(`**${message.author.username} created an invite to their party!**`)
                .setDescription(`
**[⠀⠀█ █▀█ █ █▄⠀█   █▀█ ▄▀█ █▀█ ▀█▀ █▄█
    █▄█ █▄█ █ █⠀▀█   █▀▀ █▀█ █▀▄ ⠀█⠀ ⠀█⠀](https://discord.gg/${invite.code})**
                
                Description: ${messageDescription !== ''? messageDescription : '*Party leader did not provide a description.*'}`)
                .setFooter('This invite will self-destruct 5 minutes after its creation. If you cannot join using this invite it may have expired or the party owner made their party private, sorry!')
                .setThumbnail('https://i.imgur.com/uZaOQwv.png'))
                .then(message => setTimeout(() => {message.delete()},300000));
                textChannel.send(new Discord.MessageEmbed().setTitle('Sent!').setDescription('Your invite has been sent to <#808116293713526836> so anyone can join as long as your party remains public!'))
            break;
        }
    }
}
//define findObjectByKey
function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}
//define defineMention **
async function defineMention(args, guild, message, textChannel, Discord){ 
        let id = args[1].includes('!')?args[1].slice(3,-1):args[1].slice(2,-1);
        //defines mention member
        let mention =  await guild.members.cache.find(member => member == id);

        if (mention === undefined){ 
            textChannel.send(new Discord.MessageEmbed().setDescription(`Please provide a valid user.`));
            return null;
        }
        //checks if user is bot
        if (mention.user.bot){
            message.channel.send(new Discord.MessageEmbed().setDescription('You cannot configure party settings for bot accounts.'));            
            return null;
        }

        return mention;
}
function msToTimestamp(millis){
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    //ES6 interpolated literals/template literals 
      //If seconds is less than 10 put a zero in front.
    return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}