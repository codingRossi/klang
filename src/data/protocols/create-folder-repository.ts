export type CreateFolderModel = {
  folderName: string
}

export type CreateFolderOutput = {
  success: true,
  path: string
} | {
  success: false,
  path: undefined
}

export interface ICreateFolderRepository {
  create(input: CreateFolderModel): Promise<CreateFolderOutput>
}