export type IDeleteFolderInput = {
  folderPath: string
}

export type IDeleteFolderOutput = {
  success: boolean
}

export interface IDeleteFolderRepository {
  delete(input: IDeleteFolderInput): IDeleteFolderOutput
}