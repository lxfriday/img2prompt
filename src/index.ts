import exiftool from 'dist-exiftool'
import util from 'util'
import { execFile } from 'child_process'

export async function readImage(imgPath: string): Promise<string> {
  try {
    const { stdout } = await util.promisify(execFile)(exiftool, ['-j', imgPath])
    return JSON.parse(stdout)[0].parameters
  } catch (error) {
    return ''
  }
}
