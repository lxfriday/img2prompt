import exiftool from 'dist-exiftool'
import util from 'util'
import { execFile } from 'child_process'
import { IPromptInfo } from './types'
import { processPrompt } from './util'

export async function readImage(imgPath: string): Promise<string> {
  try {
    const { stdout } = await util.promisify(execFile)(exiftool, ['-j', imgPath])
    return JSON.parse(stdout)[0].parameters || ''
  } catch (error) {
    return ''
  }
}

export async function readImageV2(imgPath: string): Promise<IPromptInfo> {
  const rawInfo = await readImage(imgPath)
  const promptInfo = processPrompt(rawInfo)
  return promptInfo
}