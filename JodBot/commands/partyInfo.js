module.exports = {
    name: 'partyinfo',
    description: 'paste party info embeds',
    async execute(message,args,Discord,client,prefix){
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
        }
        await message.delete();

        let date = new Date().toLocaleDateString()

        //Waiting Room Information        
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#eeeeee')
        .setDescription(
        `**Waiting Room**
        __ᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟ__
        
        If the **maximum** number of parties is reached and you attempt to create a new party, you will be moved into and held in the waiting room where you will take up a position in a queue. As old parties begin to close, you will move down the queue until it's your turn! When the next party closes, you will be moved into your brand new private party.
        
        **Note:** You must remain in the waiting room to maintain your position in the queue. If you leave, your position will be removed.
        
        Information last updated: ${date}`)
        .setThumbnail('https://i.imgur.com/pco5BCj.png'));

        //Jukebot Perms Information
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#eeeeee')
        .setDescription(
        `**Jukebot Party Permissions**
        __ᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟ__
        
        To keep your parties relatively calm and avoid command spam, only the **party leader** can use Jukebot commands **inside** of a party.
        
        Information last updated: ${date}`)
        .setThumbnail('https://i.imgur.com/tsP37os.png'));

        //Party Invite Links Information
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#eeeeee')
        .setDescription(
        `**Party Invite Links**
        __ᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟ__
        
        If you're a couple players short, rather than hoping some members randomly join your party, you can this feature to send an invite to <#808116293713526836>!
        
        **How to use it:** First, make your party publicly accessible using \`-party public\`. Then use \`-party invite\`.
        
        **Note:** There is a 5 minute cool down period in between uses.
        
        Information last updated: ${date}`)
        .setThumbnail('https://i.imgur.com/5Bpaqj3.png'));

        //Jukebot Perms Information
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#eeeeee')
        .setDescription(
        `**Party Leaders**
        __ᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟ__
        
        To keep your parties relatively calm and avoid command spam, only the **party leader** can use Jukebot commands **inside** of a party.
        
        Information last updated: ${date}`)
        .setThumbnail('https://i.imgur.com/yQgiH2v.png'));
            
        //Adding New Users Information
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#eeeeee')
        .setDescription(
        `**Adding New Users**
        __ᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟ__
        
        If you want to add specific members to your party, this is what you're looking for. The process is a tiny bit finicky, so we've made a couple GIFs, found in the party help menu, showing how to add members when your party is private.
        
        **How to use it:** Simply use \`-party add [@mention]\`. For more reference, you should check out the help menu found below or use \`-help party\`.
        
        Information last updated: ${date}`)
        .setThumbnail('https://i.imgur.com/5bYKQY2.png'));
        
        //Removing Users Information
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#eeeeee')
        .setDescription(
        `**Removing Users**
        __ᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟ__
        
        Someone raising unwanted havoc in your party? You can remove them, and its quite straight forward!
        (Don't worry if you remove the wrong user, you can add that user right back to your party.)
        
        **How to user it:** Simply use \`-party remove [@mention]\`.
        
        Information last updated: ${date}`)
        .setThumbnail('https://i.imgur.com/g147MKs.png'));
        
        //help information
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#eeeeee')
        .setTitle('Gamenight Help')
        .setDescription
        (`**Party Commands**
        __ᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟᅟ__

        Use \`${prefix}party help\` or \`${prefix}help party\` to recieve a list of all **party commands**.
        `)
        .setThumbnail('https://i.imgur.com/YOTmzJy.png'));

        //Party Information Main
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#eeeeee')
        .setTitle('𝙋𝙖𝙧𝙩𝙮 𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙩𝙞𝙤𝙣')
        .setDescription(
        `Our custom party system allows you to create or join public and private parties to play with your friends and meet new people. Each party comes with a **private voice channel** and a **private text channel** with many commands to help you configure your party to your needs.

        Simply join the voice channel **🔰 | click here to play!** to get started. All information you will need can be found **above**.
        
        Information last updated: ${date}`)
        .setThumbnail('https://i.imgur.com/69cyLqt.png'));
        
        //scroll up
        message.channel.send(new Discord.MessageEmbed()
        .setColor('#D6FF76')
        .setDescription(`Updated party information above. ⤴️`));

    }
    
}