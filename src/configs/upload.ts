import path from "node:path"
import crypto from "node:crypto"
import fs  from "node:fs"
import multer from "multer"

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads")


const MAX_SIZE = 3 // 3MB
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback){
      const filehash = crypto.randomBytes(10).toString("hex")
      const filename = `${filehash}-${file.originalname}`

      return callback(null, filename)
    }
  })
}

export default{
  TMP_FOLDER,
  UPLOAD_FOLDER,
  MAX_SIZE,
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  MULTER,
}