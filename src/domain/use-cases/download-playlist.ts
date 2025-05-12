export interface DownloadPlaylistInput {
  url: string,
  folderName: string
}

export interface DownloadPlaylistOutput {
  success: boolean
}

export interface DownloadPlaylistInterface {
  download(input: DownloadPlaylistInput): Promise<DownloadPlaylistOutput>
}