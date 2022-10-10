module.exports = {
    name: 'ban',
    description: 'kick users and add banned roles to said user. Then logs user ban information in google docs. ',
    async execute(message,args,Discord,client,prefix,authorID,fetch,config){
        if (!(message.member.roles.cache.find(r => r.name === "Admin")||message.member.roles.cache.find(r => r.name === "Bots"))) {
            return message.channel.send(new Discord.MessageEmbed().setDescription('You don\'t have the permissions.'));            
        }
        
        const { GoogleSpreadsheet } = require('google-spreadsheet');
        const creds = require('../client_secret.json');
        const doc = new GoogleSpreadsheet('1G4KmhkSZ3MHZwMspjOxoQ3RDWAFAI-tLezwr84Ar-EM');
        await doc.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key,
        });
        await doc.loadInfo(); // loads document properties and worksheets

        async function readContents(){

            const sheet = doc.sheetsByIndex[0];

            const rows = await (sheet.getRows)({
                offset: 1
            })
            console.log(sheet.headerValues.join(' | '));
            
        }

        readContents();
    }
}