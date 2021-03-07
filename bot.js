require('dotenv').config()

const { banlist, cardInfo } = require('./util/ygo')

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  if (msg.content === '[Bentall Bot]') {
    msg.reply('Yees?!');
  }
});


//   client.on('[user info]', msg => {
//     msg.channel.send(msg.author)
//     msg.channel.send('Test')
//   });


 //client.on('message', msg => {

//   if (msg.content === '[banlist-update]') {
//     //msg.channel.send("Test")
//      banlist().then(data => {
//       const $ = cheerio.load(data);
//       let div = $('#contents_box > h2').text().match(/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g)
//       msg.channel.send(`Yugioh Official Ban List Last Updated: ${div} at https://img.yugioh-card.com/uk/gameplay/detail.php?id=1155`)
      
//      })
//   }
// });

//Ban List
const cheerio = require('cheerio');

client.on("message", message => {
  if (message.author.bot) return false;

  if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

  if (message.mentions.has(client.user.id) && message.content.includes('YGObanlist') ) {
    banlist().then(data => {
      const $ = cheerio.load(data);
      let div = $('#contents_box > h2').text().match(/(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g)
      message.channel.send(`Yugioh Official Ban List Last Updated: ${div} at https://img.yugioh-card.com/uk/gameplay/detail.php?id=1155`)
      
     })
  };
});

//Card Data need to refactor and try to get it to stop looping on error...
 client.on('message',  msg => {
  let prefix = '[card-info]'

  if (msg.content.includes(prefix) && msg.content.length > prefix.length){
    const arg = msg.content.replace(prefix,"").trim()    
    getData(arg)
    
    async function getData(arg){
      let result = await cardInfo(arg)
      if(result){
        return msg.channel.send('```json\n' + result + '\n```')
      }
  

  }

  }})
  



client.login(process.env.BOT_TOKEN);