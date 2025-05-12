export interface LoadPlaylistInfoInput {
  url: string
}

export type LoadPlaylistInfoOutput = {
  success: true,
  name: string
} | {
  success: false,
  name: undefined
}

export interface ILoadPlaylistInfoRepository {
  load(input: LoadPlaylistInfoInput): Promise<LoadPlaylistInfoOutput>
}