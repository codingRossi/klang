export interface DownloadPlaylistInput {
  url: string,
  fileName: string,
  dir: string
}

export interface DownloadPlaylistOutput {
  success: boolean
}

export interface IDownloadPlaylistRepository {
  download(input: DownloadPlaylistInput): Promise<DownloadPlaylistOutput>
}