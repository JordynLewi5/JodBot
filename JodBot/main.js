const Discord = require('discord.js');
const config = require('./config.json')
const fs = require('fs');
const client = new Discord.Client({partials: ['MESSAGE','CHANNEL','REACTION']});
const prefix = config.prefix;
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const messageEvent = require('./eventListeners/message');
const welcome = require('./eventListeners/welcome');
const reactions = require('./eventListeners/reactions');
const voiceState = require('./eventListeners/voiceState');
const alarm = require('./eventListeners/alarm');
const fetch = require('node-fetch');
const Canvas = require('canvas')

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name,command);
}

//event listeners
client.on("ready", async (user) => {
  console.log(`Logged in as ${client.user.tag}!`);
  //client.user.setActivity() (`with ${prefix}🤖`);
  client.user.setPresence({ activity: { type: "PLAYING", name: `Gamenight ${prefix}help`}, status: 'online', })


    messageEvent(client, Discord, prefix, fetch, config);
    reactions(client, Discord, prefix);
    voiceState(client, Discord, prefix);
    welcome(client, Discord, prefix, Canvas);
    alarm(client, Discord, prefix);

    //empty party queue if empty
    const guild = client.guilds.cache.find(guild => guild.id == '775222016080871424');
    const partyQueueChannel = guild.channels.cache.get('800600463677587466');
    setInterval(async () => {
      let count = 0;
      let arr = [];
      partyQueueChannel.members.map(member => {
        count ++;
        arr.push({
          memberID: member.id
        })
      });

      localStorage.setItem('partyQueue', JSON.stringify(arr));
      
      let voters = JSON.parse(localStorage.getItem('voters'));
      voters.forEach(voter => {  
        if (Date.now() - voter.timeOfFinalVote > 2592000000 && !message.member.roles.cache.find(r => r.id == "848308999329284176")) {
          voter.member.roles.remove(message.guild.roles.cache.find(role => role.id == "800967584123584522"))
        }
      })
    }, 1000)

});



client.login(config.token);


