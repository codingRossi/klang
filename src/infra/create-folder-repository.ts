import { CreateFolderModel, CreateFolderOutput, ICreateFolderRepository } from "@/data/protocols/create-folder-repository";
import * as os from "os"
import path from "path";
import * as fs from "fs"

export class CreateFolderRepository implements ICreateFolderRepository {
  async create(input: CreateFolderModel): Promise<CreateFolderOutput> {
    try {
      const homeDir = os.homedir()
      let newFolderPath = path.join(homeDir, input.folderName)

      if (fs.existsSync(newFolderPath)) {
        for (let i = 0; i < 100; i++) {
          if (!fs.existsSync(`${newFolderPath}-${i}`)) {
            newFolderPath = `${newFolderPath}-${i}`
            break
          }
        }
      }

      fs.mkdirSync(newFolderPath)
      console.log(`Folder created in: ${newFolderPath}`)
      return {
        success: true,
        path: newFolderPath
      }
    } catch (err) {
      console.error(err)
      return {
        success: false,
        path: undefined
      }
    }
  }
}