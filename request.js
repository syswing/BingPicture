const request = require('request')
const fs = require('fs')


const createRequest = (method, url, data, options) => {
  return new Promise((resolve, reject) => {
    request('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5&nc=1592366050854&pid=hp',(error,response,body) => {
      console.log(response.body)
      const imagesArr = JSON.parse(response.body).images
      for(let i = 0;i<imagesArr.length;i++){
        const url = `https://cn.bing.com/${imagesArr[i].url}`
        request(url).pipe(fs.createWriteStream(`./imgs/${imagesArr[i].fullstartdate}.png`))
      }
      const wallpaper = require('wallpaper')
      wallpaper.set(`./imgs/${imagesArr[imagesArr.length - 1 ].fullstartdate}.png`)
    })
  })
}

module.exports = createRequest