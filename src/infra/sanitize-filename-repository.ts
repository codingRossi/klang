import { ISanitizeFilenameRepository, ISanitizeFilenameRepositoryInput, ISanitizeFilenameRepositoryOutput } from "@/data/protocols/sanitize-filename-repository";

export class SanitizeFileNameRepository implements ISanitizeFilenameRepository {
  sanitize(input: ISanitizeFilenameRepositoryInput): ISanitizeFilenameRepositoryOutput {
    try {
      const sanitizeFilename = (name: string): string => {
        return name
          .replace(/[\\\/:*?"<>|]/g, '')
          .replace(/\s+/g, '_');
      }

      const result = sanitizeFilename(input.fileName)
      return {
        success: true,
        sanitizedFilename: result
      }
    } catch (err) {
      return {
        success: false,
        sanitizedFilename: undefined
      }
    }
  }
}