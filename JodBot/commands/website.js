module.exports = {
    name: 'website',
    description: 'placeholder to prevent errors',
    execute(message,args,Discord,client) {
        message.channel.send(new Discord.MessageEmbed().setTitle(`Important Links:`).setDescription(`Homepage: [gamenight.li](https://www.gamenight.li/)
        Apply: [gamenight.li/apply](https://www.gamenight.li/apply)
        Store: [gamenight.li/store](https://www.gamenight.li/store)
        Vote: [gamenight.li/vote](https://www.gamenight.li/vote)
        Support: [gamenight.li/support](https://www.gamenight.li/support)
        `));
    }
}