export interface DownloadMusicInterfaceInput {
  url: string,
  trackName: string
}

export interface DownloadMusicInterfaceOutput {
  success: boolean
}

export interface DownloadMusicInterface {
  download(input: DownloadMusicInterfaceInput): Promise<DownloadMusicInterfaceOutput>
}