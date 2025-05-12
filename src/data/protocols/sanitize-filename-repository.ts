export type ISanitizeFilenameRepositoryInput = {
  fileName: string
}

export type ISanitizeFilenameRepositoryOutput = {
  success: true,
  sanitizedFilename: string
} | {
  success: false,
  sanitizedFilename: undefined
}

export interface ISanitizeFilenameRepository {
  sanitize(input: ISanitizeFilenameRepositoryInput): ISanitizeFilenameRepositoryOutput
}