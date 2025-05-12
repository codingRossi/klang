export interface DownloadMP3Input {
  url: string,
  trackName: string
}

export interface DownloadMP3Output {
  success: boolean
}

export interface IDownloadMP3Repository {
  download(input: DownloadMP3Input): Promise<DownloadMP3Output>
}