const message = require("./message");

module.exports = (client,Discord,prefix) => {
    const guild = client.guilds.cache.find(guild => guild.id == '775222016080871424');
    const channel = guild.channels.cache.get('847164235011457024');
    //11 pm kickout
    setInterval(() => {
        var now = new Date();
        var millisTill = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0, 0) - now;
        if (millisTill < 0) {
            millisTill += 86400000;
        }
        console.log(millisTill)
        setTimeout(function(){
            channel.send(new Discord.MessageEmbedd().setDescription('Voting is a great way to help the server and increase activity. Voting will also give you cool **perks** and access to **exclusive** features that give you more control over your parties.\n\n**https://gamenight.li/vote** or use **\`-vote\`** \n\n[<@&847163379507527718>]'));}, millisTill);
    }, 86400000)
    
}