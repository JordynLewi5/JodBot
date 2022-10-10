module.exports = {
    name: 'pp',
    description: 'pp',
    execute(message,args,Discord,client){
        let maxSize = 10;
        if (message.author.tag === 'Jod#5225'||message.author.tag === 'JodBot#8350') maxSize = 50;
        let size = Math.round(Math.random()*maxSize);
        let pp = '8';
        for (i = 0; i < size; i++) { pp = pp + '='; }
        pp = pp + 'D';
        message.channel.send(new Discord.MessageEmbed().setTitle('pp size machine').setDescription(`${message.author.tag}'s pp\n${pp}`).setColor(Math.round(Math.random()*16777215)));
    }
}