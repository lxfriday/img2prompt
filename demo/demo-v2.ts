import path from 'path'
import { readImageV2 } from '../src'
;(async () => {
  console.log('info', await readImageV2(path.join(__dirname, './a.png')))
})()
