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


let CareerPageLink = "https://recruiting.ultipro.ca/BEN5000BENTK/JobBoard/6f7f3dc0-d599-4e78-9ee5-fa1703eb67ac/?q=&o=postedDateDesc&w=&wc=&we=&wpst="

client.on('message', msg => {
    if (msg.content === '[Bentall Bot] Careers') {
      msg.channel.send('Check out our latest job postings here:' + CareerPageLink);
    }
  });



  client.on('[user info]', msg => {
    msg.channel.send(msg.author)
    msg.channel.send('Test')
  });


  // client.on('message', msg => {
  //   if (msg.content === '[ban-list-update]') {
  //     msg.reply('Yees?!');
  //   }
  // });

//Ban List


// client.on('message', msg => {

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

//Card Info
 client.on('message', async msg => {
   let prefix = '[card-info]'
     const arg = msg.content.replace(prefix,"").trim()
    
     let result = await cardInfo(arg).then(data=>{
       const carddata = {
              name: data.data[0].name,
              card_type: data.data[0].type,
              atk: data.data[0].atk,
              def: data.data[0].def,
              level: data.data[0].level,
              monstertype:data.data[0].race,
              effect:data.data[0].desc
       }

     return carddata
     }).catch((undefined, e)=>{
       if (e){
         throw e
       }
     })

     if (result){
       const JSONCard = JSON.stringify(result, null, 2);
       msg.channel.send('```json\n' + JSONCard + '\n```')
       return false
     } 
    
 
  
 });



// const cardInfotest  = require('./util/test');

// client.on('message', async msg => {
//   let prefix = '[card-info]'
//   const arg = msg.content.replace(prefix,"").trim()
    
//     let result = await cardInfotest(arg)

//        return msg.channel.send('```json\n' + result + '\n```')
//        console.log('mesage')

// });



client.login(process.env.BOT_TOKEN);