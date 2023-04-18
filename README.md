# img2prompt

Read the prompt information for generating images from stable diffusion.

[demo](./assets/demo.png)

## Install

```bash
npm i img2prompt

# or
pnpm add img2prompt

# or
yarn add img2prompt
```

## Usage

ts

```typescript
import path from 'path'
import { readImage } from 'img2prompt'
;(async () => {
  console.log('prompt info', await readImage(path.join(__dirname, './a.png')))
})()
```

commonjs

```js
const path = require('path')
const { readImage } = require('img2prompt')

;(async () => {
  console.log('prompt info', await readImage(path.join(__dirname, './a.png')))
})()
```

output

```
info masterpiece, best quality, official art, 8k wallpaper, highly detailed, illustration, (((1 girl))), white hair, long hair, detailed eyes, forrest, bare shoulders, hanfu,lakes, pure, soft smile,bamboo, <lora:clearvae_main:0.3> ,<lora:Moxin_10:0.4> , <lora:elegantHanfuRuqun_v10:0.3>,
Negative prompt: fat, naked, nude, paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, ((monochrome)), ((grayscale)), bad anatomy, DeepNegative, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, bad feet, cropped, poorly drawn hands, poorly drawn face, mutation, deformed, extra fingers, extra limbs, extra arms, extra legs, malformed limbs, fused fingers, too many fingers, long neck, cross-eyed, mutated hands, polar lowres, bad body, bad proportions, gross proportions, text, error, missing fingers, missing arms, missing legs,
Steps: 25, Sampler: Euler a, CFG scale: 5, Seed: 356983177, Size: 768x1080, Model hash: 7107c05c1c, Model: dalcefoPainting_3rd, Hashes: {"lora:clearvae_main": "600345c503", "lora:Moxin_10": "3fd52c707c", "lora:elegantHanfuRuqun_v10": "495901d34f", "model": "7107c05c1c"}
```

## License

MIT

## keywords

- stable diffusion
- prompt
- img2prompt
- midjourney
- get prompt
- generate prompt
- stable diffusion prompt
- text to img
- img to text
- img2text
- text2img
