module.exports = {
    name: 'information',
    description: '',
    execute(message,args,Discord,client){
        try {
            if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots"))) {
                return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));
            }
        } catch(error) { return; }
        message.channel.send('**General Information** \n\n:arrow_forward: **What is Gamenight?**\n\n- Gamenight was started as a fun way to connect with other people during the difficult times of the Covid-19 pandemic. It was a weekly event where we played party games from Jackbox Games, Cards Against Humanity, Minecraft, and other games to simply watching movies, tv shows, or video clips all while chatting in voice channels. \n- Our end goal is for this discord server to become essentially autonomous with our members hosting and participating in their own Gamenight parties. \n\n:arrow_forward: **What is *your* role?**\n\nAs <@&775231812683300864> of Gamenight, your role is to simply have fun and enjoy the games hosted by our Gamenight Hosts and interact nicely with the other Gamenight contestants. \n\n:arrow_forward: **What is *our* role?**\n\nAs Gamenight <@&775228119823941632>, we want to ensure everyone is having the best time possible by providing fun, inclusive events like the ones listed above!\n\n\nIf you have any further questions, please message <@599075619178807312> or <@411639985876500483>  and we will get back to you as soon as possible. \n\n**Visit our [website](https://www.gamenight.li)!** ');
    }
}