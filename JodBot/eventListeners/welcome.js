module.exports = (client, Discord, prefix, Canvas) => {
        const { userProfile } = require('./memberDataUpdate');
        //event listener new member joins guild
        client.on('guildMemberAdd', async member => {

            //define users from local storage
            let users = JSON.parse(localStorage.getItem('users'));

            //if user does not exist in local storage create new profile
            if(!findObjectByKey(users, 'userID', member.user.id)) await userProfile(member,['775231812683300864'],0,0,false,null,null,null,false,null,null,null);

            users = JSON.parse(localStorage.getItem('users'));

            //get userData
            const userData = findObjectByKey(users, 'userID', member.user.id);

            if(JSON.parse(localStorage.getItem('maintenance'))) member.roles.add()
            // //add all user roles to user
            // userData._roles.forEach(x => {
            //     member.guild.members.cache.get(member.user.id).roles.add(x);
            // });

            // send welcome message
            member.send(new Discord.MessageEmbed().setTitle(`Welcome to the server, ${member.user.tag}!`).setDescription
            (`Please check out <#775226903442620417> before continuing to the server so you are aware of our rules. Also, make sure you read <#775231917997293568> so that you understand how the server works.
            
            **Visit our website: [gamenight.li](https://gamenight.li)**
            Thanks for joining!`)
            .setColor(Math.random() * 10000000 + 6777210));
            //create help menu
            help = new Discord.MessageEmbed()
            .setColor(Math.random() * 10000000 + 6777210)
            .setTitle(`You can use the directory below to find **important** commands.`)
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
            member.send(help);
        
        const guild = client.guilds.cache.find(guild => guild.id == '775222016080871424');

        let welcomeChannel = guild.channels.cache.get('775222016080871427')


        const applyText = (canvas, text) => {
            const context = canvas.getContext('2d');
            let fontSize = 90;
        
            do {
                context.font = `${fontSize -= 10}px sans-serif`;
            } while (context.measureText(text).width > canvas.width - 300);
        
            return context.font;
        };
        
     
            const canvas = Canvas.createCanvas(700, 250);
            const context = canvas.getContext('2d');
        
            const background = await Canvas.loadImage('https://img.freepik.com/free-vector/space-with-stars-universe-space-infinity-background_78474-99.jpg?size=626&ext=jpg');
            context.drawImage(background, 0, 0, canvas.width, canvas.height);
        
            context.strokeStyle = '#74037b';
            context.strokeRect(0, 0, canvas.width, canvas.height);
        
            context.font = '30px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);
        
            context.font = applyText(canvas, `${member.displayName}!`);
            context.fillStyle = '#ffffff';
            context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.5);
        
            context.beginPath();
            context.arc(125, 125, 100, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
        
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
            context.drawImage(avatar, 25, 25, 200, 200);
        
            const attachment = new Discord.MessageAttachment(canvas.toBuffer());
        
            welcomeChannel.send(`Welcome to the server, ${member}!`, attachment)
    })
}

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}