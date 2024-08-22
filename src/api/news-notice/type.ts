export interface pageType {
  currentPage: number
  paegSize: number
}
export interface getArticlesRequestData extends pageType {
  title: string
}
export interface ApiByIdRequestData {
  id: string
}
export interface batchDelApiRequestData {
  ids: Array<string>
}
