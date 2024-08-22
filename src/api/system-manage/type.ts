export interface pageType {
  currentPage: number
  paegSize: number
}

export interface getMenusRequestData extends pageType {
  title: string
}
export interface geUsersRequestData extends pageType {
  username: string
  nickname: string
  sex: number
  role: number
}
export interface ApiByIdRequestData {
  id: string
}
export interface batchDelApiRequestData {
  ids: Array<string>
}
