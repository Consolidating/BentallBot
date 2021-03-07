const axios = require('axios');
const url = 'https://img.yugioh-card.com/uk/gameplay/detail.php?id=1155';

function banlist() {
    return axios.get(url).then(response => response.data)
}

async function cardinfo(cardname){
    const ygourl = `https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=${cardname}`
    const data = await axios.get(ygourl).then(response => response.data).catch(()=>{})

   if(data){
    const carddata = {
        name: data.data[0].name,
        card_type: data.data[0].type,
        atk: data.data[0].atk,
        def: data.data[0].def,
        level: data.data[0].level,
        monstertype:data.data[0].race,
        effect:data.data[0].desc
    }
        const JSONCard = JSON.stringify(carddata, null, 2);
        return JSONCard
   } 

}


module.exports = {
    banlist: banlist,
    cardInfo: cardinfo,
}


