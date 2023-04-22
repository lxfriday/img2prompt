import { IPromptInfo } from './types'

export function safeGet(regex: RegExp, target: string) {
  try {
    return regex.exec(target)![1].trim()
  } catch {
    return ''
  }
}

export function safeGetPrompt(target: string) {
  try {
    const idxes = [
      target.indexOf('negative prompt:'),
      target.indexOf('negativeprompt:'),
      target.indexOf('sampler:'),
      target.indexOf('cfg scale:'),
      target.indexOf('seed:'),
      target.indexOf('size:'),
      target.indexOf('model hash:'),
      target.indexOf('model:'),
      target.indexOf('steps:'),
    ].filter((idx) => idx > -1)
    return target.slice(0, Math.min(...idxes, target.length)).trim()
  } catch {
    return ''
  }
}

export function safeGetNegativePrompt(target: string) {
  try {
    const negIdxes = [
      target.indexOf('negative prompt:'),
      target.indexOf('negativeprompt:'),
    ].filter((idx) => idx > -1)
    if (negIdxes.length === 0) return ''
    const idx = Math.min(...negIdxes)
    target = target.slice(idx)
    const idxes = [
      target.indexOf('sampler:'),
      target.indexOf('cfg scale:'),
      target.indexOf('seed:'),
      target.indexOf('size:'),
      target.indexOf('model hash:'),
      target.indexOf('model:'),
      target.indexOf('steps:'),
    ].filter((idx) => idx > -1)
    return target
      .slice(0, Math.min(...idxes, target.length))
      .replace('negative prompt:', '')
      .replace('negativeprompt:', '')
      .trim()
  } catch {
    return ''
  }
}

export function processPrompt(target: string) {
  target = target.toLowerCase().trim()
  let prompt = safeGetPrompt(target),
    negativePrompt = safeGetNegativePrompt(target),
    sampler = safeGet(/sampler:(.+?),/gi, target),
    cfgScale = safeGet(/cfg scale:(.+?),/gi, target),
    steps = safeGet(/steps:(.+?),/gi, target),
    seed = safeGet(/seed:(.+?),/gi, target),
    size = safeGet(/size:(.+?),/gi, target),
    modelHash = safeGet(/model hash:(.+?),/gi, target),
    model =
      safeGet(/model:(.+?),/gi, target) || safeGet(/model:(.+),?/gi, target)

  const modelInfo = {
    prompt,
    negativePrompt,
    sampler,
    cfgScale,
    seed,
    size,
    modelHash,
    model,
    steps,
  } as IPromptInfo
  return modelInfo
}

export function genEmptyPromptInfo() {
  return {
    prompt: '',
    negativePrompt: '',
    sampler: '',
    cfgScale: '',
    seed: '',
    size: '',
    modelHash: '',
    model: '',
    steps: '',
  } as IPromptInfo
}
