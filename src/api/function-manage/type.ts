export interface pageType {
  currentPage: number
  paegSize: number
}
export interface getCategoriesRequestData extends pageType {
  name: string
}
export interface getCoursesRequestData extends pageType {
  categoryId: string
  name: string
  recommended: string
  introductory: string
}
export interface getChaptersRequestData extends pageType {
  courseId: string
  title: string
}
export interface ApiByIdRequestData {
  id: string
}
export interface batchDelApiRequestData {
  ids: Array<string>
}
