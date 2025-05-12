import { ILoadMusicInfoRepository, LoadMusicInfoInput, LoadMusicInfoOutput } from "@/data/protocols/load-music-info-repository";
import scdl from "soundcloud-downloader";

export class LoadMusicInfoRepository implements ILoadMusicInfoRepository {
  async load(input: LoadMusicInfoInput): Promise<LoadMusicInfoOutput> {
    const payload = await scdl.getInfo(input.url)
    if (!payload.title) {
      return {
        success: false,
        name: undefined
      }
    }
    return {
      name: payload.title,
      success: true
    }
  }
}