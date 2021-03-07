const axios = require('axios');
const url = 'https://img.yugioh-card.com/uk/gameplay/detail.php?id=1155';

function banlist() {
    return axios.get(url).then(response => response.data)
}

function cardInfo(cardname){
    const ygourl = `https://db.ygoprodeck.com/api/v7/cardinfo.php?&name=${cardname}`
    return axios.get(ygourl).then(response => response.data)

}

//cardInfo("dark magician")


module.exports = {
    banlist: banlist,
    cardInfo: cardInfo,
}


