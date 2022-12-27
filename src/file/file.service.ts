import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { FileResponse } from './file-response'
import { FileDto } from './file.dto'

@Injectable()
export class FileService {
  async uploadFile(files: FileDto, route: string = 'default') {
    const pathFile = `${path}/uploads/${route}`
    await ensureDir(pathFile)

    await writeFile(
      `${pathFile}/${files.frontImage[0].originalname}`,
      files.frontImage[0].buffer,
    )
    await writeFile(
      `${pathFile}/${files.backImage[0].originalname}`,
      files.backImage[0].buffer,
    )

    // const res: FileResponse[] = await Promise.all(
    //   files.map(async (file) => {
    //     await writeFile(`${pathFile}/${file.originalname}`, file.buffer)
    //     return {
    //       url: `uploads/${route}/${file.originalname}`,
    //       name: file.originalname,
    //     }
    //   }),
    // )

    // return res

    return {
      frontImageUrl: `uploads/${route}/${files.frontImage[0].originalname}`,
      frontImageName: files.frontImage[0].originalname,
      backImageUrl: `uploads/${route}/${files.backImage[0].originalname}`,
      backImageName: files.backImage[0].originalname,
    }
  }
}
