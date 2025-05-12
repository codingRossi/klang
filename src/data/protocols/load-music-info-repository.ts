export interface LoadMusicInfoInput {
  url: string
}

export type LoadMusicInfoOutput = {
  success: true,
  name: string
} | {
  success: false,
  name: undefined
}

export interface ILoadMusicInfoRepository {
  load(input: LoadMusicInfoInput): Promise<LoadMusicInfoOutput>
}