import { DownloadPlaylistInput, DownloadPlaylistInterface, DownloadPlaylistOutput } from "../../domain/use-cases/download-playlist";
import { ICreateFolderRepository } from "../protocols/create-folder-repository";
import { IDeleteFolderRepository } from "../protocols/delete-folder-repository";
import { IDownloadPlaylistRepository } from "../protocols/download-playlist-repository";
import { ISanitizeFilenameRepository } from "../protocols/sanitize-filename-repository";

export class DownloadPlaylist implements DownloadPlaylistInterface {
  private readonly createFolder: ICreateFolderRepository
  private readonly downloadPlaylist: IDownloadPlaylistRepository
  private readonly sanitizeFileName: ISanitizeFilenameRepository
  private readonly deleteFolder: IDeleteFolderRepository

  constructor(
    createFolder: ICreateFolderRepository,
    downloadPlaylist: IDownloadPlaylistRepository,
    sanitizeFileName: ISanitizeFilenameRepository,
    deleteFolder: IDeleteFolderRepository
  ) {
    this.createFolder = createFolder
    this.downloadPlaylist = downloadPlaylist
    this.sanitizeFileName = sanitizeFileName
    this.deleteFolder = deleteFolder
  }

  async download(input: DownloadPlaylistInput): Promise<DownloadPlaylistOutput> {
    try {
      const sanitizedFilename = this.sanitizeFileName.sanitize({ fileName: input.folderName })
      if (!sanitizedFilename.success) {
        return {
          success: false
        }
      }
      const folderMaker = await this.createFolder.create({
        folderName: sanitizedFilename.sanitizedFilename
      })
      if (!folderMaker.success) {
        return {
          success: false
        }
      }

      const downloader = await this.downloadPlaylist.download({ url: input.url, fileName: sanitizedFilename.sanitizedFilename, dir: folderMaker.path })
      if (!downloader.success) {
        console.error("Error downloading playlist")
        this.deleteFolder.delete({ folderPath: folderMaker.path })
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