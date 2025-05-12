import { DownloadMP3Repository } from "@/infra/download-mp3-repository";
import { DownloadMusicInterface, DownloadMusicInterfaceInput, DownloadMusicInterfaceOutput } from "../../domain/use-cases/download-music";
import * as fs from "fs"
import * as os from "os"
import { CreateFolderRepository } from "@/infra/create-folder-repository";
import path from "path";

export class DownloadMusic implements DownloadMusicInterface {
  private readonly downloadMusic: DownloadMP3Repository
  private readonly createFolder: CreateFolderRepository

  constructor(downloadMusic: DownloadMP3Repository, createFolder: CreateFolderRepository) {
    this.downloadMusic = downloadMusic
    this.createFolder = createFolder
  }

  async download(input: DownloadMusicInterfaceInput): Promise<DownloadMusicInterfaceOutput> {
    try {
      const folder = os.homedir()
      const folderPath = path.join(folder, "music")
      if (!fs.existsSync(folderPath)) {
        const folderMaker = await this.createFolder.create({ folderName: "music" })
        if (!folderMaker.success) {
          console.log("Error creating folder music")
          return {
            success: false
          }
        }
      }

      const downloader = await this.downloadMusic.download({
        url: input.url,
        trackName: input.trackName
      })
      if (!downloader.success) {
        console.log("Error in download mp3, in infra")
        return {
          success: false
        }
      }

      return {
        success: true
      }
    } catch (err) {
      console.error(err)
      return {
        success: false
      }
    }
  }
}