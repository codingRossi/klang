import { IDeleteFolderInput, IDeleteFolderOutput, IDeleteFolderRepository } from "@/data/protocols/delete-folder-repository";
import * as fs from "fs"

export class DeleteFolderRepository implements IDeleteFolderRepository {
  delete(input: IDeleteFolderInput): IDeleteFolderOutput {
    try {
      if (fs.existsSync(input.folderPath)) {
        fs.rmSync(input.folderPath)
        console.log("folder deleted successfully")
        return {
          success: true
        }
      }
      return {
        success: false
      }
    } catch {
      return {
        success: false
      }
    }
  }
}