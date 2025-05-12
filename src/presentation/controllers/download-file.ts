import { LoadPlaylistInfoRepository } from "@/infra/load-playlist-info-repository"
import { DownloadFile, Input, Output } from "../protocols/downloadFile"
import { DownloadMusic } from "@/data/use-cases/download-music"
import { DownloadPlaylist } from "@/data/use-cases/download-playlist"
import { LoadMusicInfoRepository } from "@/infra/load-music-info-repository"
import { ILoadMusicInfoRepository } from "@/data/protocols/load-music-info-repository"

export class DownloadFileController implements DownloadFile {
  private readonly downloadMusic: DownloadMusic
  private readonly downloadPlaylist: DownloadPlaylist
  private readonly loadPlaylist: LoadPlaylistInfoRepository
  private readonly loadMusic: ILoadMusicInfoRepository

  constructor(
    downloadMusic: DownloadMusic,
    downloadPlaylist: DownloadPlaylist,
    loadPlaylist: LoadPlaylistInfoRepository,
    loadMusic: LoadMusicInfoRepository,
  ) {
    this.downloadMusic = downloadMusic
    this.loadPlaylist = loadPlaylist
    this.downloadPlaylist = downloadPlaylist
    this.loadMusic = loadMusic
  }
  async handle(input: Input): Promise<Output> {
    try {
      const getPlaylistInfo = await this.loadPlaylist.load({ url: input.url })
      if (!getPlaylistInfo.success) {
        const getMusicInfo = await this.loadMusic.load({ url: input.url })
        if (!getMusicInfo.success) {
          return {
            success: false
          }
        }
        const musicDownloader = await this.downloadMusic.download({
          url: input.url,
          trackName: getMusicInfo.name
        })
        if (!musicDownloader.success) {
          console.log("Error downloading music")
          return {
            success: false
          }
        }

        return {
          success: true
        }
      }

      const downloadPlaylist = await this.downloadPlaylist.download({
        folderName: getPlaylistInfo.name,
        url: input.url,
      })
      if (!downloadPlaylist.success) {
        console.log("Error downloading playlist")
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