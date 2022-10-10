module.exports = {
    name: 'gif',
    description: 'search for gif',
    async execute(message,args,Discord,client,prefix,authorID,fetch,config){
        try{
            if (!(message.member.roles.cache.find(r => r.name === "Contestant")||message.member.roles.cache.find(r => r.name === "Bots")||message.member.roles.cache.find(r => r.name === "Admin"))) {
                return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
            }
        } catch(error) { return; }
        let url = `https://api.tenor.com/v1/search?q=${args}&key=${config.tenortoken}&contentfilter=medium`;
        let response = await fetch(url);
        let json = await response.json();
        const index = Math.floor(Math.random() * json.results.length);
        message.delete();
        message.channel.send(json.results[index].url);
    }
}