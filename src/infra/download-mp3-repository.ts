import { DownloadMP3Input, DownloadMP3Output, IDownloadMP3Repository } from "@/data/protocols/download-mp3-repository";
import scdl from "soundcloud-downloader";
import * as fs from "fs"
import * as os from "os"
import path from "path";

export class DownloadMP3Repository implements IDownloadMP3Repository {
  async download(input: DownloadMP3Input): Promise<DownloadMP3Output> {
    try {
      const a = path.join(os.homedir() + "/music", input.trackName)
      scdl.download(input.url).then(stream => stream.pipe(fs.createWriteStream(a)))
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
