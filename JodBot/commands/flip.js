module.exports = {
    name: 'flip',
    description: 'coin toss',
    async execute(message,args,Discord,client,prefix,authorID,fetch,config){
        try{
            if (!(message.member.roles.cache.find(r => r.name === "Contestant")||message.member.roles.cache.find(r => r.name === "Bots")||message.member.roles.cache.find(r => r.name === "Admin"))) {
                return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
            }
        } catch(error) { return; }
        if(args[0] > 25) return message.channel.send(new Discord.MessageEmbed().setDescription('You can only flip the coin up to **25** times at once.'));

        let coin = {
            heads: 0,
            tails: 0
        }

        //flip coin
        let flip =  Math.round(Math.random());

        //count first result
        switch (flip) {
            case 0:
                coin.tails++;
                flip = 'tails';
            break;
            case 1:
                coin.heads++;
                flip = 'heads';
            break;
        }

        //add first coin to list
        let flips = [flip];


        //check if arg passed is a valid number
        if(args[0] !== undefined && !isNaN(args[0])){
            //flip coin specified times
            for(let i = 0; i < args[0] - 1; i++){
                //flip coin
                flip =  Math.round(Math.random());

                //count sides
                switch (flip) {
                    case 0:
                        coin.tails++;
                        flip = 'tails';
                    break;
                    case 1:
                        coin.heads++;
                        flip = 'heads';
                    break;
                }
                //add flip to list
                flips.push(' ' + flip);
            }
        }

        //send results to channel
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Flipped the coin ${flips.length} time(s).`)
        .setDescription(`**Result(s):**\n\`${flips}\`\n\nLanded on heads ${coin.heads} time(s).\nLanded on tail ${coin.tails} time(s).`));
    
    }
}