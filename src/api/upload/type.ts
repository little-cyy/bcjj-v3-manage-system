export interface uploadRequestData {
  /**附件  */
  file: FormData
}

export interface FileData extends Record<string, any> {
  url: string
}
export interface uploadResponseData {
  /**附件地址  */
  files: Array<FileData>
}
