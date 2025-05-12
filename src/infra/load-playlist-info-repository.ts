import { ILoadPlaylistInfoRepository, LoadPlaylistInfoInput, LoadPlaylistInfoOutput } from "@/data/protocols/load-playlist-info-repository";
import scdl from "soundcloud-downloader";

export class LoadPlaylistInfoRepository implements ILoadPlaylistInfoRepository {
  async load(input: LoadPlaylistInfoInput): Promise<LoadPlaylistInfoOutput> {
    try {
      const payload = await scdl.getSetInfo(input.url) as any
      return {
        success: true,
        name: payload.title,
      }

    } catch (err) {
      console.error("Error loading information", err)
      return {
        name: undefined,
        success: false
      }
    }
  }
}