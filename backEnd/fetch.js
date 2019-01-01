const fs = require('fs')
const axios = require('axios')
const moment = require('moment')
const historyDatas = []
const baseURL = 'https://rest.coinapi.io/v1/exchangerate/ETH/USD?apikey=BC15501A-171A-4E95-B3B3-9F9F8BAE507D'
const baseTime = '2018-03-27T23:59:59.7606038Z'

async function fetchData () {
  for (let i=1; i<100; i++) {
    let time = moment(baseTime).subtract(i, 'days').format('YYYY-MM-DD');
    try {
      await fetchHistoryData(time)
      fs.writeFileSync('data.txt', JSON.stringify(historyDatas))
      console.log('processed for time : ', time)
    } catch (e) {
      console.log(e)
    }
  }
}

function fetchHistoryData (time) {
  return new Promise((resolve, reject) => {
    axios.get(`${baseURL}&time=${time}`)
      .then((resp) => {
        historyDatas.push(resp.data)
        resolve()
      })
      .catch(err => {
        reject()
      })
  })
}

fetchData()