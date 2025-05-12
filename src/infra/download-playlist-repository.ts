import scdl from "soundcloud-downloader";
import { DownloadPlaylistInput, DownloadPlaylistOutput, IDownloadPlaylistRepository } from "@/data/protocols/download-playlist-repository";
import * as fs from "fs"
import path from "path";
import { ISanitizeFilenameRepository } from "@/data/protocols/sanitize-filename-repository";

export class DownloadPlaylistRepository implements IDownloadPlaylistRepository {
  private readonly sanitizeFileName: ISanitizeFilenameRepository

  constructor(sanitizeFileName: ISanitizeFilenameRepository) {
    this.sanitizeFileName = sanitizeFileName
  }
  async download(input: DownloadPlaylistInput): Promise<DownloadPlaylistOutput> {
    try {
      await scdl
        .downloadPlaylist(input.url)
        .then(([streams, trackNames]) => {
          streams.forEach((val, idx) => {
            const name = this.sanitizeFileName.sanitize({ fileName: trackNames[idx] as string })
            //@ts-expect-error
            val.pipe(fs.createWriteStream(path.join(input.dir, name.sanitizedFilename + '.mp3')))
            console.log('donwloaded: ', trackNames[idx])
          })
        })

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

// streams.forEach((val, idx) => {
//   val.pipeTo(fs.createWriteStream(path.join('/path/to/folder/', trackNames[idx] + '.mp3')))
// })