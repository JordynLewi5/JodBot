module.exports = {
    name: 'store',
    description: 'Sends link to store.',
    execute(message,args,Discord,client){
      message.channel.send(new Discord.MessageEmbed().setDescription('Purchase roles or simply donate at [gamenight.li/store](https://gamenight.li/store).'));
    }
}