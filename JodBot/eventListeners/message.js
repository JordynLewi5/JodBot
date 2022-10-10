const antispam = require('./antispam');
const votingReward = require('./votingReward');
module.exports = (client,Discord,prefix,fetch,config) => {
    client.on('message', async (message) => {

      const args = message.content.slice(prefix.length).split(/ +/);
      const command = args.shift().toLowerCase();
      const authorID = message.author.id;
      if (message.author.id == '479688142908162059')
        return votingReward(command, Discord, prefix, message);
      
      if(message.guild === null && command !== 'help') return;

      // This is for sending a message to users when they try to use Juke commands while not meeting requirements.
      if(message.content == `${prefix}`) return;
      
      if (!message.content.startsWith(prefix)||message.content.startsWith('||')) return;


      console.log(`${message.author.tag}: ${message.content}`);
    
      try{
        await client.commands.get(command).execute(message,args,Discord,client,prefix,authorID,fetch,config);
      }
      catch(error){
        console.log(error)
        // console.error(error.name);
      }
      

    });
}

