export type Input = {
  url: string,
}

export type Output = {
  success: true
} | {
  success: false
}

export interface DownloadFile {
  handle(input: Input): Promise<Output>
}