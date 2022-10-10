module.exports = {
    name: 'vote',
    description: 'Sends link to vote.',
    execute(message,args,Discord,client){
      message.channel.send(new Discord.MessageEmbed().setDescription(`You can vote once every 12 hours by going to [gamenight.li/vote](https://gamenight.li/vote).
      
      **Tip:** Voting will give you the <@&821093832845688833> role for **12 hours**, which includes the following perks:
      \` 1 \` Increased max user limit in parties **(+10)**
      \` 2 \` Access to \`-party title\``));
    }
}