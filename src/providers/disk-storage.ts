import fs from "node:fs"
import path from "node:path"


import uploadConfig from "@/configs/upload"
import { AppError } from "@/utils/app-error"

class DiskStorage {
  async saveFile(file: string) {
    const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file)
    const desPath = path.resolve(uploadConfig.UPLOAD_FOLDER, file)

    try {
      await fs.promises.access(tmpPath)
    } catch (error) {
      console.log(error)
      throw new AppError(`Arquivo não encontrado: ${tmpPath}`)
    }

    await fs.promises.mkdir(uploadConfig.UPLOAD_FOLDER, { recursive: true })
    await fs.promises.rename(tmpPath, desPath)

    return file
  }

  async deletefile(file: string, type: "tmp" | "upload") {
    const pathFile = 
      type === "tmp" ? uploadConfig.TMP_FOLDER : uploadConfig.UPLOAD_FOLDER

      const filePath = path.resolve(pathFile, file)

      try {
        await fs.promises.stat(filePath)
      } catch {
        return
      }

      await fs.promises.unlink(filePath)

  }
}

export { DiskStorage }