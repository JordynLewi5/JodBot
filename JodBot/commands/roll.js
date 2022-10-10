module.exports = {
    name: 'roll',
    description: 'roll a dice',
    async execute(message,args,Discord,client,prefix,authorID,fetch,config){
        try{
            if (!(message.member.roles.cache.find(r => r.name === "Contestant")||message.member.roles.cache.find(r => r.name === "Bots")||message.member.roles.cache.find(r => r.name === "Admin"))) {
                return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
            }
        } catch(error) { return; }
        //limit number of rolls at once
        if(args[0] > 25) return message.channel.send(new Discord.MessageEmbed().setDescription('You can only roll the dice up to **25** times at once.'));

        //counter for number of results per side
        let dice = { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0 };

        //start summing rolls
        let sumOfRolls = 0;
        //roll first time
        let roll =  Math.ceil(Math.random()*6);
        sumOfRolls += roll;
        //count sides
        switch (roll) {
            case 1:
                dice.one++;
            break;
            case 2:
                dice.two++;
            break;
            case 3:
                dice.three++;
            break;
            case 4:
                dice.four++;
            break;
            case 5:
                dice.five++;
            break;
            case 6:
                dice.six++;
            break;
        }

        //rolls list
        let rolls = [roll];



        //check if arg passed is a valid number
        if(args[0] !== undefined && !isNaN(args[0])){
            //roll dice specified times
            for(let i = 0; i < args[0] - 1; i++){
                //roll dice
                roll =  Math.ceil(Math.random()*6);
                sumOfRolls += roll;
                //count sides
                switch (roll) {
                    case 1:
                        dice.one++;
                    break;
                    case 2:
                        dice.two++;
                    break;
                    case 3:
                        dice.three++;
                    break;
                    case 4:
                        dice.four++;
                    break;
                    case 5:
                        dice.five++;
                    break;
                    case 6:
                        dice.six++;
                    break;
                }
                //add roll to list
                rolls.push(' ' + roll);
            }
        }

        //send results to channel
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Rolled the dice ${rolls.length} time(s).`)
        .setDescription(`**Result(s):**\n\`${rolls}\`\n\nRolled one ${dice.one} time(s).\nRolled two ${dice.two} time(s).\nRolled three ${dice.three} time(s).\nRolled four ${dice.four} time(s).\nRoled five ${dice.five} time(s).\nRolled six ${dice.six} time(s).\n\n**Sum of rolls:** ${sumOfRolls}`));
    
    }
}