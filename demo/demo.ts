import path from 'path'
import { readImage } from '..'
;(async () => {
  console.log('info', await readImage(path.join(__dirname, './a.png')))
})()
