import path from 'path'
import { readImage } from '../src'
;(async () => {
  console.log('info', await readImage(path.join(__dirname, './a.png')))
})()
