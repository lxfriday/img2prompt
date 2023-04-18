const path = require('path')
const { readImage } = require('../')

;(async () => {
  console.log('info', await readImage(path.join(__dirname, './a.png')))
})()
