module.exports = {
    name: 'help',
    description: 'Displays a list of all JodBot  commands.',
    execute(message,args,Discord,client,prefix){
      // if (!(message.member.roles.cache.find(r => r.name === "Contestant")||message.member.roles.cache.find(r => r.name === "Bots")||message.member.roles.cache.find(r => r.name === "Admin"))) {
      //   return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
      // }
      message.react('<:pingmessage:807824271246098472>');
      if (args[0] !== undefined) args[0] = args[0].toLowerCase();
      switch(args[0]){
        case 'general':
          help = new Discord.MessageEmbed()
          .setColor(Math.random() * 10000000 + 6777214)
          .setTitle('Gamenight Help')
          .setDescription
          (`**Main Commands**
          __ᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟ__

          **Command: \`${prefix}vote\`**
          Get the link to vote for the server on top.gg to recieve some temporary perks.

          **Command: \`${prefix}store\`**
          Get the store website link.

          **Command: \`${prefix}invite\`**
          Server invite link.

          **Command: \`${prefix}info\`**
          Server information.

          **Command: \`${prefix}rules\`**
          Server rules.

          **Command: \`${prefix}apply\`**
          Get an application for the host role. Also found at <#784547407803187230>.

          **Command: \`${prefix}flip [#]\`**
          Flips a coin and shows the results.

          **Command: \`${prefix}roll [#]\`**
          Rolls a dice and shows the results.


          `)
          .setThumbnail('https://i.imgur.com/69cyLqt.png')
          //send embed to channel
          message.author.send(help);
        break;
        case 'party':
          //Our custom party system allows you to create or join public and private parties to play with your friends and meet new people. Each party comes with a private voice channel and a private text channel with several commands to help you configure your party to your needs.

          //Simply join the voice channel 🔰 | click here to start to get started. Below you will find all of the commands you will need to get set up.


          help = new Discord.MessageEmbed()
          .setColor(args[1] !== undefined? args[1]:Math.random() * 10000000 + 6777214)
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
          if (args[2] !== 'channel___') {
            message.author.send(help);
          } else {
            message.channel.send(help);
            message.delete();
          }
        break;
        //jukebot command menu
        case 'juke': case 'music': case 'jukebot':
          //create help menu
          help = new Discord.MessageEmbed()
          .setColor(Math.random() * 10000000 + 6777214)
          .setTitle('Gamenight Help')
          .setDescription
          (`**Jukebot Commands**
          __ᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟ__

          **Command: \`${prefix}play [song title / YouTube Playlist URL]\`**
          Plays audio from YouTube video in current voice channel.
          **Alias:** \`${prefix}p\`
          **TIP:** How to get a [YouTube playlist URL](https://i.imgur.com/XNS4JPO.gif).

          **Command: \`${prefix}queue [page #]\`**
          Displays the current queue for the Jukebot in your channel.
          **Alias:** \`${prefix}q\`

          **Command: \`${prefix}pause\`**
          Pauses the current track.

          **Command: \`${prefix}resume\`**
          Resumes the current paused track.

          **Command: \`${prefix}skip\`**
          Skips the current track.
          **Alias:** \`${prefix}s\`

          **Command: \`${prefix}back\`**
          Skips to the previous track.
          **Alias:** \`${prefix}b\` \`${prefix}previous\` \`${prefix}prev\`

          **Command: \`${prefix}seek [timestamp / seconds]\`**
          Jumps to a specified timestamp of the current track.

          **Command: \`${prefix}jump [track #]\`**
          Jumps to specified track.
          **Alias:** \`${prefix}j\` \`${prefix}to\` \`${prefix}jumpto\`

          **Command: \`${prefix}remove [track # / [track # track #]]\`**
          Removes the selected track # or all tracks within a certain range of track #s from the current queue.
          **Alias:** \`${prefix}r\`

          **Command: \`${prefix}shuffle\`**
          Shuffles the queue while maintaining current track position.
          **Alias:** \`${prefix}mix\` \`${prefix}scramble\`

          **Command: \`${prefix}volume [0 - 200]\`**
          Query or set the Jukebot volume for your voice channel.
          **Alias:** \`${prefix}v\`
          **TIP:** To query the Jukebot volume for your voice channel, type the command without any arguments.

          **Command: \`${prefix}leave\`**
          Clears queue and kicks Jukebot from channel.
          **Alias:** \`${prefix}l\` \`${prefix}disconnect\` \`${prefix}stop\`

          `)
          .setThumbnail('https://i.imgur.com/69cyLqt.png')
          //send embed to channel
          message.author.send(help);
        break;
        //jukebot command menu
        
        
        //if no valid args are provided
        default:
          //create help menu
          help = new Discord.MessageEmbed()
          .setColor(Math.random() * 10000000 + 6777214)
          .setTitle('Gamenight Help')
          .setDescription
          (`__**Help Directory**__

          \`${prefix}help general\` | General commands and their usages.

          \`${prefix}help party\` | Party commands and their usages.

          \`${prefix}help jukebot\` | Jukebot commands and their usages.
          ᅟ
          `)
          .addFields({name: '__Other Music Bots__', 
          value: `Groovy: \`=help\` or <@234395307759108106>\`help\`
          Rythm: \`!help\` or <@235088799074484224>\`help\`
          Octave: \`_help\` or <@201503408652419073>\`help\``})
          .setFooter(`TIP: For ease of use, the "-help" command has been enabled in direct message channels.`)
          .setThumbnail('https://i.imgur.com/69cyLqt.png')
          //send embed to channel
          message.author.send(help);
        break;

    }
  }
}














